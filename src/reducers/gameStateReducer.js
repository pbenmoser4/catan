import {
  ADD_PLAYER,
  SET_ROLL,
  SET_ROLLING,
  START_GAME,
} from "../actions/types";

const BASE_STATE = {
  dice: {
    rolling: false,
    numbers: [1, 1],
    roll: 2,
  },
  thisPlayerId: 0,
  gameOwnerId: 0,
  turn: 0,
  setupPhase: false,
  gameplayPhase: false,
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

      let newThisPlayerId = state.thisPlayerId;

      if (state.devMode) {
        // set the active player to the just created player
        newThisPlayerId = id;
      }

      return {
        ...state,
        thisPlayerId: newThisPlayerId,
      };
    case START_GAME:
      console.log("let's do what we came into the room to do.");
    default:
      return state;
  }
};

export default gameStateReducer;
