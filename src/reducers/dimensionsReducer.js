import { SET_BOARD_DIMENSIONS } from "../actions/types";

const BASE_STATE = {};

const dimensionsReducer = (state = BASE_STATE, action) => {
  switch (action.type) {
    case SET_BOARD_DIMENSIONS:
      return action.payload;
    default:
      return state;
  }
};

export default boardReducer;
