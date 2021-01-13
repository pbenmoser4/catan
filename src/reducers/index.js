import { combineReducers } from "redux";

import boardReducer from "./boardReducer";
import dimensionsReducer from "./dimensionsReducer";
import actionsReducer from "./actionsReducer";
import gameStateReducer from "./gameStateReducer";
import playersReducer from "./playersReducer";

export default combineReducers({
  board: boardReducer,
  dimensions: dimensionsReducer,
  actions: actionsReducer,
  gameState: gameStateReducer,
  players: playersReducer,
});
