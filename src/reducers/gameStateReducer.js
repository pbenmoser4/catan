import { SET_ROLL, SET_ROLLING } from "../actions/types";

const BASE_STATE = {
  dice: {
    rolling: false,
    numbers: [1, 1],
    roll: 2,
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
    default:
      return state;
  }
};

export default gameStateReducer;
