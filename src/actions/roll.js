import _ from "lodash";

import { ADD_RESOURCES_TO_PLAYER, SET_ROLLING, SET_ROLL } from "./types";
import { getNodeIndicesForTileIndex } from "../util/helpers";
import { RESOURCE } from "../util/constants";

// Dice stuff babyyyy

export const startRoll = () => (dispatch, getState) => {
  dispatch({
    type: SET_ROLLING,
    payload: null,
  });
};

export const endRoll = () => (dispatch, getState) => {
  const { board, players } = getState();
  const { tiles } = board;

  const roll = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
  const rollValue = roll[0] + roll[1];

  dispatch({
    type: SET_ROLL,
    payload: roll,
  });

  const tileHits = _.filter(tiles, (t) => t.number === rollValue);
  console.log(tileHits);

  // now we have the tiles that have the same number as the roll.
  // we need to take these tiles, and get the nodes associated with them, and then
  //   figure out if anyone has cities or settlements on those nodes.
  // We should also factor the Robber into this equation...

  _.forEach(tileHits, (tile, idx) => {
    const resource = tile[RESOURCE];
    const nodesIndicesForTile = getNodeIndicesForTileIndex(tile);

    const boardNodesForTile = _.intersectionBy(
      board.nodes,
      nodesIndicesForTile,
      (n) => `${n.row}${n.col}`
    );

    const settlementOrCityBoardNodes = _.filter(
      boardNodesForTile,
      (n) => n.settlement || n.city
    );

    console.log(settlementOrCityBoardNodes);

    _.forEach(settlementOrCityBoardNodes, (node, idx) => {
      const { settlement, city } = node;
      const count = city ? 2 : settlement ? 1 : 0;
      const { playerId } = settlement;

      dispatch({
        type: ADD_RESOURCES_TO_PLAYER,
        payload: {
          playerId: playerId,
          resources: [
            {
              resource: resource,
              count: count,
            },
          ],
        },
      });
    });
  });
};
