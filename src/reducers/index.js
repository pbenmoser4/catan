import { combineReducers } from "redux";

import boardReducer from "./boardReducer";
import dimensionsReducer from "./dimensionsReducer";
import actionsReducer from "./actionsReducer";

export default combineReducers({
  board: boardReducer,
  dimensions: dimensionsReducer,
  actions: actionsReducer,
});
