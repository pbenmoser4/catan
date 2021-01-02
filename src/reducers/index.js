import { combineReducers } from "redux";

import boardReducer from "./boardReducer";
import dimensionsReducer from "./dimensionsReducer";

export default combineReducers({
  board: boardReducer,
  dimensions: dimensionsReducer,
});
