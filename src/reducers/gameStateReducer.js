import {
  SET_ROLL,
  SET_ROLLING,
  START_GAME,
  START_GAMEPLAY_PHASE,
  START_SETUP_PHASE_1,
  START_SETUP_PHASE_2,
} from "../actions/types";

import {
  SETUP_PHASE_1,
  SETUP_PHASE_2,
  GAMEPLAY_PHASE,
} from "../util/constants";

const BASE_STATE = {
  dice: {
    rolling: false,
    numbers: [1, 1],
    roll: 2,
  },
  gameOwnerId: 0,
  turn: 0,
  setupPhase: false,
  gameplayPhase: false,
  devMode: true,
};

const gameStateReducer = (state = BASE_STATE, action) => {
  switch (action.type) {
    case SET_ROLL:
      const nums = action.payload;
      const roll = parseInt(nums[0]) + parseInt(nums[1]);
      return { ...state, dice: { rolling: false, numbers: nums, roll: roll } };
    case SET_ROLLING:
      const currentNumbers = state.dice.numbers;
      const currentRoll = state.dice.roll;
      return {
        ...state,
        dice: { rolling: true, numbers: currentNumbers, roll: currentRoll },
      };
    case START_GAME:
      return { ...state, setupPhase: SETUP_PHASE_1 };
    case START_GAMEPLAY_PHASE:
      return { ...state, setupPhase: false, gameplayPhase: GAMEPLAY_PHASE };
    case START_SETUP_PHASE_1:
      return { ...state, setupPhase: SETUP_PHASE_1 };
    case START_SETUP_PHASE_2:
      return { ...state, setupPhase: SETUP_PHASE_2 };
    default:
      return state;
  }
};

export default gameStateReducer;
