import _ from "lodash";

import {
  ADD_RESOURCES_TO_PLAYER,
  BLOCK_GAME,
  GIVE_CARD,
  SET_ROLLING,
  SET_ROLL,
  UPDATE_PLAYERS,
} from "./types";
import {
  getNodeIndicesForTileIndex,
  getCardCountForHand,
} from "../util/helpers";
import { RESOURCE, SEVEN_ROLL } from "../util/constants";

// Dice stuff babyyyy

export const startRoll = () => (dispatch, getState) => {
  dispatch({
    type: SET_ROLLING,
    payload: null,
  });
};

export const endRoll = () => (dispatch, getState) => {
  const { board } = getState();
  const { players } = getState().players;
  const { tiles } = board;

  // const roll = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
  const roll = [3, 4];
  const rollValue = roll[0] + roll[1];

  dispatch({
    type: SET_ROLL,
    payload: roll,
  });

  if (rollValue === 7) {
    // uh oh, somebody rolled the robber

    // see if anyone has more than 7 resource cards
    // If anyone does, set the gamestate as blocked by seven roll
    // for each person who has more than 7, set their available actions to [GIVE_CARD]
    // Each time a player who has to carry out the action carries it out, check if you still need to block
    // if you don't update the active player's actions to continue their turn
    console.log("ROBBER!!!!");
    let playersOverSeven = _.filter(players, (p) => {
      const playerHand = p.hand;
      const resourceCount = getCardCountForHand(playerHand.resources);
      return resourceCount > 7;
    });

    playersOverSeven = _.map(playersOverSeven, (p) => {
      return { ...p, availableActions: [GIVE_CARD] };
    });

    console.log(playersOverSeven);

    if (playersOverSeven.length > 0) {
      dispatch({
        type: BLOCK_GAME,
        payload: SEVEN_ROLL,
      });

      dispatch({
        type: UPDATE_PLAYERS,
        payload: playersOverSeven,
      });
    }

    // then we have to go through the steal series of events
  } else {
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
  }
};
