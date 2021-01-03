import _ from "lodash";
import { NODE_CLICK, TILE_CLICK } from "../util/constants";
import { SET_NODE_CLICK_ACTION, SET_TILE_CLICK_ACTION } from "../actions/types";

const BASE_STATE = {};
BASE_STATE[NODE_CLICK] = (node) => {
  console.log(node);
};
BASE_STATE[TILE_CLICK] = (tile) => {
  console.log(tile);
};

const actionsReducer = (state = BASE_STATE, action) => {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case SET_NODE_CLICK_ACTION:
      newState[NODE_CLICK] = action.payload;
      return newState;
    case SET_TILE_CLICK_ACTION:
      newState[TILE_CLICK] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default actionsReducer;
