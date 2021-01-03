import { NODE_CLICK } from "../util/constants";
import { SET_NODE_CLICK_ACTION } from "../actions/types";

const BASE_STATE = {};
BASE_STATE[NODE_CLICK] = (nodeIndex) => {
  console.log(nodeIndex);
};

const actionsReducer = (state = BASE_STATE, action) => {
  switch (action.type) {
    case SET_NODE_CLICK_ACTION:
      let newState = state;
      newState[NODE_CLICK] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default actionsReducer;
