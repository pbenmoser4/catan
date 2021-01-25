import _ from "lodash";

import {
  ADD_RESOURCES_TO_PLAYER,
  PLACE_SETTLEMENT,
  PLACE_ROAD,
  UPDATE_PLAYERS,
  UPDATE_PLAYERS_NEW_ORDER,
  SET_ROLL_ORDER,
  START_GAMEPLAY_PHASE,
} from "./types";

import { BRICK, ORE, SHEEP, WHEAT, WOOD } from "../util/constants";

export const setInitialStateForTesting = () => (dispatch, getState) => {
  const settlementIndices = [
    { row: 4, col: 7 },
    { row: 5, col: 9 },
    { row: 6, col: 7 },
    { row: 7, col: 9 },
    { row: 8, col: 7 },
    { row: 9, col: 9 },
    { row: 10, col: 7 },
    { row: 11, col: 9 },
  ];

  const roadIndices = [
    { row: 8, col: 7 },
    { row: 10, col: 9 },
    { row: 12, col: 7 },
    { row: 14, col: 9 },
    { row: 16, col: 7 },
    { row: 18, col: 9 },
    { row: 20, col: 7 },
    { row: 22, col: 9 },
  ];

  const placementArray = _.zip(settlementIndices, roadIndices);
  const { players } = getState().players;

  _.forEach(placementArray, (item, idx) => {
    let settlementNode = item[0];
    let roadEdge = item[1];
    let player = players[Math.floor(idx / 2)];
    dispatch({
      type: PLACE_SETTLEMENT,
      payload: {
        player: player,
        node: settlementNode,
      },
    });
    dispatch({
      type: PLACE_ROAD,
      payload: {
        player: player,
        edge: roadEdge,
      },
    });
  });

  _.forEach(players, (p) => {
    dispatch({
      type: ADD_RESOURCES_TO_PLAYER,
      payload: {
        playerId: p.id,
        resources: [
          {
            resource: BRICK,
            count: 3,
          },
          {
            resource: ORE,
            count: 3,
          },
          {
            resource: SHEEP,
            count: 3,
          },
          {
            resource: WHEAT,
            count: 3,
          },
          {
            resource: WOOD,
            count: 3,
          },
        ],
      },
    });
  });

  dispatch({
    type: START_GAMEPLAY_PHASE,
    payload: null,
  });
};
