import {
  ADD_PLAYER,
  SET_ROLL,
  SET_ROLLING,
  ROLL,
  BUILD,
  BUY,
  TRADE,
  USE,
  STEAL,
  PLACE,
  START_GAME,
} from "../actions/types";

const BASE_STATE = {
  dice: {
    rolling: false,
    numbers: [1, 1],
    roll: 2,
  },
  rollOrder: [0],
  activePlayer: 0,
  availableActions: [START_GAME, ROLL],
  turn: 0,
  setupPhase: false,
  gameplayPhase: false,
  playerScores: {
    0: 0,
  },
  setup: {
    order: [0],
    phase: 0,
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
