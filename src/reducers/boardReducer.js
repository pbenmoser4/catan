import { SET_BOARD_STATE } from "../actions/types";

const BASE_STATE = {};

const boardReducer = (state = BASE_STATE, action) => {
  switch (action.type) {
    case SET_BOARD_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default boardReducer;
