import {
  ADD_PLAYER,
  SET_ROLL,
  SET_ROLLING,
  START_GAME,
} from "../actions/types";

import {
  ROLL,
  BUILD,
  BUY,
  TRADE,
  USE,
  STEAL,
  START,
  PLACE,
} from "../util/constants";

const BASE_STATE = {
  dice: {
    rolling: false,
    numbers: [1, 1],
    roll: 2,
  },
  rollOrder: [],
  activePlayer: 0,
  availableActions: [START],
  turn: 0,
  setupPhase: false,
  gameplayPhase: false,
  playerScores: {},
  setup: {
    order: [],
    phase: 0,
  },
  devMode: true,
  turn: {
    action: null,
    player: null,
  },
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
    case ADD_PLAYER:
      const { id } = action.payload;
      const newRollOrder = state.rollOrder;
      newRollOrder.push(id);
      const newSetup = state.setup;
      const newPlayerScores = state.playerScores;
      newPlayerScores[id] = 0;
      newSetup["order"] = newRollOrder;
      return {
        ...state,
        rollOrder: newRollOrder,
        setup: newSetup,
        playerScores: newPlayerScores,
      };
    default:
      return state;
  }
};

export default gameStateReducer;
