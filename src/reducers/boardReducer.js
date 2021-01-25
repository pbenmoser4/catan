import _ from "lodash";

import {
  SET_BOARD_STATE,
  PLACE_SETTLEMENT,
  PLACE_CITY,
  PLACE_ROAD,
} from "../actions/types";

const BASE_STATE = {};

const boardReducer = (state = BASE_STATE, action) => {
  let node = null;
  let boardNode = null;
  let boardEdge = null;
  let edge = null;
  let player = null;

  switch (action.type) {
    case SET_BOARD_STATE:
      return action.payload;
    case PLACE_SETTLEMENT:
      node = action.payload.node;
      boardNode = _.find(
        state.nodes,
        (n) => n.row === node.row && n.col === node.col
      );
      player = action.payload.player;
      const settlement = { playerId: player.id, color: player.color };
      const newSettlementNode = { ...boardNode, settlement: settlement };
      const newNodesWithSettlement = _.unionBy(
        [newSettlementNode],
        state.nodes,
        (node) => {
          return `${node.row}${node.col}`;
        }
      );
      return { ...state, nodes: newNodesWithSettlement };
    case PLACE_CITY:
      node = action.payload.node;
      player = action.payload.player;
      boardNode = _.find(
        state.nodes,
        (n) => n.row === node.row && n.col === node.col
      );
      const city = { playerId: player.id, color: player.color };
      const newCityNode = { ...boardNode, city: city };
      delete newCityNode.settlement;
      const newNodesWithCity = _.unionBy([newCityNode], state.nodes, (node) => {
        return `${node.row}${node.col}`;
      });
      return { ...state, nodes: newNodesWithCity };
    case PLACE_ROAD:
      edge = action.payload.edge;
      player = action.payload.player;
      boardEdge = _.find(
        state.edges,
        (e) => e.row === edge.row && e.col === edge.col
      );
      const road = { playerId: player.id, color: player.color };
      const newRoadEdge = { ...boardEdge, road: road };
      const newEdgesWithRoad = _.unionBy([newRoadEdge], state.edges, (edge) => {
        return `${edge.row}${edge.col}`;
      });
      return { ...state, edges: newEdgesWithRoad };
    default:
      return state;
  }
};

export default boardReducer;
