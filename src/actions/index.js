import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import {
  ADD_PLAYER,
  CANCEL_PLACE_ROAD_ACTION,
  CANCEL_PLACE_SETTLEMENT_ACTION,
  END_TURN,
  PLACE_CITY,
  PLACE_ROAD,
  PLACE_SETTLEMENT,
  ROLL,
  SET_BOARD_STATE,
  SET_BOARD_DIMENSIONS,
  SET_ROLL_ORDER,
  START_PLACE_ROAD_ACTION,
  SET_ROLL,
  SET_ROLLING,
  START_GAME,
  START_GAMEPLAY_PHASE,
  START_PLACE_CITY_ACTION,
  START_PLACE_SETTLEMENT_ACTION,
  START_SETUP_PHASE_1,
  START_SETUP_PHASE_2,
  UPDATE_PLAYER,
  UPDATE_PLAYERS,
} from "./types";
import {
  ports,
  portCounts,
  tileCounts,
  DESERT,
  RESOURCE,
  WATER,
  PORT_RESOURCE,
  PORT_DIRECTION,
  SETUP_PHASE_1,
  SETUP_PHASE_2,
  GAMEPLAY_PHASE,
} from "../util/constants";
import {
  generateArrayFromCountDict,
  buildRowIndices,
  generatePipPlacementArray,
  getAdjacentNodeIndicesForNode,
  getConnectedEdgeIndicesForEdgeIndex,
  getEdgeIndicesForTileIndex,
  getNodeIndicesForTileIndex,
  getTileIndicesForNodeIndex,
  getNodeIndicesForEdgeIndex,
  getBoardLayout,
} from "../util/helpers";

export const generateBoardState = (numCols) => (dispatch, getState) => {
  // This will cotain the final game state at the end of the function.
  let tiles = [];
  let nodes = [];
  let edges = [];

  // Take the dictionary of tile counts and turn it into a randomized array based
  // on the tile counts. Do the same for the port counts
  const randomizedTiles = generateArrayFromCountDict(tileCounts);
  const randomizedPorts = generateArrayFromCountDict(portCounts);

  // always one ocean column on either side of the board
  const numLandCols = numCols - 2;
  const boardMiddle = parseInt(Math.floor(numCols / 2));
  const rowOffset = 2; // two rows of ocean at the top before land starts

  const centerIndex = {
    row: numCols - 1,
    col: Math.floor(numCols / 2),
  };
  let desertIndex = undefined;

  // generate the land tiles
  for (let i = 0; i < numLandCols; ++i) {
    // how many columns from the middle is the tile?
    let offset = Math.ceil(i / 2);
    // harmonic moving outwards based on offset
    let directedOffset = Math.pow(-1, i) * offset;
    // index of the column
    let columnIndex = boardMiddle + directedOffset;
    // how many rows are in this column
    let rowsInColumn = numLandCols - offset;
    let rowIndices = buildRowIndices(rowsInColumn, numLandCols, rowOffset);
    // avoiding linting warning about unsafe references
    let columnNodes = [];
    let columnEdges = [];
    let columnTiles = [];
    let dIndex = undefined;

    rowIndices.forEach((j, i) => {
      let tileIndex = { row: j, col: columnIndex };
      let tile = {};
      tile = { ...tileIndex };
      let resource = randomizedTiles.pop();
      tile[RESOURCE] = resource;
      if (resource === DESERT) {
        dIndex = tileIndex;
      }

      columnTiles.push(tile);

      let tileNodes = getNodeIndicesForTileIndex(tileIndex);
      columnNodes = _.unionBy(
        columnNodes,
        tileNodes,
        ({ row, col }) => `${row}${col}`
      );

      let tileEdges = getEdgeIndicesForTileIndex(tileIndex);
      columnEdges = _.unionBy(
        columnEdges,
        tileEdges,
        ({ row, col }) => `${row}${col}`
      );
    });
    if (dIndex) {
      desertIndex = dIndex;
    }

    // Protecting against unsage references - linting issue with JSX
    nodes = _.unionBy(nodes, columnNodes, ({ row, col }) => `${row}${col}`);
    edges = _.unionBy(edges, columnEdges, ({ row, col }) => `${row}${col}`);
    tiles = _.unionBy(tiles, columnTiles, ({ row, col }) => `${row}${col}`);
  }

  // generate ocean tiles
  let oceanTiles = [];
  let numRows = numCols * 2 - 1;

  for (let i = 0; i < numCols; i++) {
    let rowOffset = Math.abs(i - 3);
    let col = i;
    let rows = [];
    if (i === 0 || i === numCols - 1) {
      for (let j = rowOffset; j <= numRows - rowOffset; j += 2) {
        rows.push(j);
      }
    } else {
      rows.push(rowOffset);
      rows.push(numRows - rowOffset - 1);
    }

    for (let row of rows) {
      let tileIndex = { row: row, col: col };
      let tile = { ...tileIndex };
      // see if this is a port tile.
      let port = _.find(ports, (port) => {
        return port.tileIndex.row === row && port.tileIndex.col === col;
      });
      let portResource = port ? randomizedPorts.pop() : undefined;
      tile[PORT_RESOURCE] = port ? portResource : undefined;
      tile[PORT_DIRECTION] = port ? port[PORT_DIRECTION] : undefined;
      tile[RESOURCE] = WATER;
      oceanTiles.push(tile);
    }
  }

  const pipPlacementArray = generatePipPlacementArray(centerIndex, desertIndex);

  const tCopy = _.cloneDeep(tiles);
  tiles = tCopy.map((t) => {
    let tPip = _.find(
      pipPlacementArray,
      (p) => p.row === t.row && p.col === t.col
    );
    if (tPip) {
      return { ...t, number: tPip.number };
    }
    return t;
  });

  dispatch({
    type: SET_BOARD_STATE,
    payload: {
      tiles: tiles,
      nodes: nodes,
      edges: edges,
      oceanTiles: oceanTiles,
    },
  });
};

export const setBoardDimensions = (
  containerBox,
  numCols,
  tilePadRatio,
  pad
) => (dispatch, getState) => {
  const layout = getBoardLayout(containerBox, numCols, tilePadRatio, pad);

  dispatch({
    type: SET_BOARD_DIMENSIONS,
    payload: layout,
  });
};

export const getTilesForNode = (node) => (dispatch, getState) => {
  const state = getState();
  const { board } = state;
  const { tiles, oceanTiles } = board;
  const allTiles = _.union(tiles, oceanTiles);
  const tileIndices = getTileIndicesForNodeIndex(node);
  return tileIndices.map((tidx) => {
    let tMatch = _.find(allTiles, (t) => {
      return t.row === tidx.row && t.col === tidx.col;
    });
    let tMatchCopy = _.cloneDeep(tMatch);
    tMatchCopy["direction"] = tidx["direction"];
    return tMatchCopy;
  });
};

export const getResourceTilesForNode = (node) => (dispatch, getState) => {
  const allTiles = getTilesForNode(node)(dispatch, getState);
  const resourceTiles = _.filter(allTiles, (t) => t[RESOURCE] !== WATER);
  return resourceTiles;
};

export const getPortsForNode = (node) => (dispatch, getState) => {
  const allTiles = getTilesForNode(node)(dispatch, getState);
  const portTiles = _.filter(
    allTiles,
    (t) => t[RESOURCE] === WATER && t[PORT_RESOURCE] !== undefined
  );

  const ret = portTiles.map((pt) => {
    const { direction, PORT_RESOURCE, PORT_DIRECTION } = pt;
    switch (direction) {
      case "ll":
        if (["ur", "dr"].includes(PORT_DIRECTION)) {
          return PORT_RESOURCE;
        } else {
          return undefined;
        }
      case "dl":
        if (["ur", "uu"].includes(PORT_DIRECTION)) {
          return PORT_RESOURCE;
        } else {
          return undefined;
        }
      case "ul":
        if (["dr", "dd"].includes(PORT_DIRECTION)) {
          return PORT_RESOURCE;
        } else {
          return undefined;
        }
      case "rr":
        if (["ul", "dl"].includes(PORT_DIRECTION)) {
          return PORT_RESOURCE;
        } else {
          return undefined;
        }
      case "ur":
        if (["dl", "dd"].includes(PORT_DIRECTION)) {
          return PORT_RESOURCE;
        } else {
          return undefined;
        }
      case "dr":
        if (["ul", "uu"].includes(PORT_DIRECTION)) {
          return PORT_RESOURCE;
        } else {
          return undefined;
        }
      default:
        return undefined;
    }
  });

  return ret[0] ? ret : undefined;
};

// Dice stuff babyyyy

export const startRoll = () => (dispatch, getState) => {
  dispatch({
    type: SET_ROLLING,
    payload: null,
  });
};

export const endRoll = () => (dispatch, getState) => {
  dispatch({
    type: SET_ROLL,
    payload: [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)],
  });
};

// player creation actions

export const addPlayer = (displayName) => async (dispatch, getState) => {
  const currentPlayers = getState().players.players;
  const currentGameState = getState().gameState;

  const { setupPhase, gameplayPhase } = currentGameState;

  const existingPlayer = _.find(
    currentPlayers,
    (player) => player.displayName === displayName
  );
  if (existingPlayer) {
    throw new Error("Player already exists. Please choose another name.");
  } else if (currentPlayers.length === 4) {
    throw new Error("This game's full, find another, sucker!");
  } else if (setupPhase || gameplayPhase) {
    throw new Error("Gameplay has already begun! Sorry, sucker!");
  } else {
    const playerId = uuidv4();
    dispatch({
      type: ADD_PLAYER,
      payload: {
        displayName: displayName,
        id: playerId,
      },
    });
    return `Created new player: ${displayName}`;
  }
};

// gameplay actions

export const startGame = () => async (dispatch, getState) => {
  const { players } = getState().players;
  const { gameOwnerId } = getState().gameState;

  const gameOwner = _.find(players, (player) => player.id === gameOwnerId);
  const ownerName = gameOwner.displayName;
  const thisPlayer = _.find(players, (player) => player.isThisPlayer);

  if (thisPlayer.id === gameOwnerId) {
    dispatch({
      type: START_GAME,
      payload: null,
    });
  } else {
    console.log(`only ${ownerName} can start the game!`);
  }
};

// Piece placement functions

const getGameStateNodesForNodeIndices = (nodeIndices, stateNodes) => {
  return _.intersectionBy(stateNodes, nodeIndices, (n) => {
    return `${n.row}${n.col}`;
  });
};

const getGameStateNodeForNodeIndex = (nodeIndex, stateNodes) => {
  const idxs = getGameStateNodesForNodeIndices([nodeIndex], stateNodes);
  return idxs.length > 0 ? idxs[0] : null;
};

const getGameStateEdgesForEdgeIndices = (edgeIndices, stateEdges) => {
  return _.intersectionBy(stateEdges, edgeIndices, (e) => {
    return `${e.row}${e.col}`;
  });
};

const getGameStateEdgeForEdgeIndex = (edgeIndex, stateEdges) => {
  const idxs = getGameStateEdgesForEdgeIndices([edgeIndex], stateEdges);
  return idxs.length > 0 ? idxs[0] : null;
};

const getGameStateTilesForNodeIndex = (nodeIndex, stateTiles) => {
  const idxs = getTileIndicesForNodeIndex(nodeIndex);
  return _.intersectionBy(stateTiles, idxs, (t) => `${t.row}${t.col}`);
};

// Placing Settlements

export const startPlaceSettlementAction = (player) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: START_PLACE_SETTLEMENT_ACTION,
    payload: player,
  });
};

export const placeSettlement = (node, player) => async (dispatch, getState) => {
  const { settlement, city } = node;
  const { players } = getState().players;
  const { setupPhase, gameplayPhase } = getState().gameState;
  const adjNodes = getGameStateNodesForNodeIndices(
    getAdjacentNodeIndicesForNode(node),
    getState().board.nodes
  );
  const adjTiles = getGameStateTilesForNodeIndex(node, getState().board.tiles);

  const hasAdjacentSettlementsOrCities = !!_.find(
    adjNodes,
    (n) => !!n.settlement || !!n.city
  );

  if (settlement || city) {
    console.log("You can't place a settlement where one already exists");
    return false;
  } else if (hasAdjacentSettlementsOrCities) {
    console.log("You can't place a settlement adjacent to another settlement");
    return false;
  } else {
    // there's no settlement or city, and there's no adjacent settlement or city
    dispatch({
      type: PLACE_SETTLEMENT,
      payload: {
        player: player,
        node: node,
      },
    });

    let playerIndex = _.findIndex(players, { id: player.id });
    let newPlayer = _.cloneDeep(player);
    newPlayer.currentAction = null;
    // post-placement updates
    if (setupPhase) {
      // we're currently in the setup phase
      newPlayer.availableActions = [PLACE_ROAD];
      if (setupPhase === SETUP_PHASE_2) {
        // give player a resource card for each adjacent node
        let newHand = newPlayer.hand;
        adjTiles.forEach((tile, i) => {
          if (tile.RESOURCE !== DESERT) {
            newHand.resources[tile.RESOURCE] += 1;
          }
        });
        newPlayer.hand = newHand;
      }
    } else if (gameplayPhase) {
      // we're in gameplay phase
      newPlayer.availableActions = [END_TURN];
    }

    console.log(newPlayer);

    dispatch({
      type: UPDATE_PLAYER,
      payload: {
        playerIndex: playerIndex,
        player: newPlayer,
      },
    });
  }
};

export const startPlaceCityAction = (player) => async (dispatch, getState) => {
  dispatch({
    type: START_PLACE_CITY_ACTION,
    payload: player,
  });
};

export const placeCity = (node, player) => async (dispatch, getState) => {
  const { city } = node;
  if (city) {
    console.log("You can't place a city where one already exists");
    return false;
  }

  // You can only place a city if a settlement already exists here.
  const { settlement } = node;
  if (settlement) {
    if (settlement.playerId === player.id) {
      dispatch({
        type: PLACE_CITY,
        payload: {
          player: player,
          node: node,
        },
      });
    } else {
      console.log(
        "You can only place a city on a node with a settlement of yours"
      );
      return false;
    }
  } else {
    console.log("You can only palce a city where there's already a settlement");
    return false;
  }
};

export const startPlaceRoadAction = (player) => async (dispatch, getState) => {
  dispatch({
    type: START_PLACE_ROAD_ACTION,
    payload: player,
  });
};

export const placeRoad = (edge, player) => async (dispatch, getState) => {
  const { road } = edge;
  const { players } = getState().players;
  const { setupPhase, gameplayPhase, devMode } = getState().gameState;

  if (road) {
    console.log("You can't place a road where one already exists");
    return false;
  }

  const adjEdges = getGameStateEdgesForEdgeIndices(
    getConnectedEdgeIndicesForEdgeIndex(edge),
    getState().board.edges
  );

  const adjNodes = getGameStateNodesForNodeIndices(
    getNodeIndicesForEdgeIndex(edge),
    getState().board.nodes
  );

  const edgeNodesWithPlayerCity = _.find(adjNodes, (node) => {
    const { settlement, city } = node;
    if (settlement) {
      return settlement.playerId === player.id;
    } else if (city) {
      return city.playerId === player.id;
    } else {
      return false;
    }
  });

  const adjEdgesWithPlayerRoad = _.find(adjEdges, (e) => {
    const { road } = e;
    if (road) {
      return road.playerId === player.id;
    } else {
      return false;
    }
  });

  // make sure that one of the adjacent nodes has a city for this player.
  if (!edgeNodesWithPlayerCity && !adjEdgesWithPlayerRoad) {
    console.log(
      "You have to have an adjacent road, settlement or city to place a road here."
    );
    return false;
  } else {
    // placement is possible
    let playerIndex = _.findIndex(players, { id: player.id });
    let playerClone = _.cloneDeep(player);
    playerClone.currentAction = null;
    dispatch({
      type: PLACE_ROAD,
      payload: {
        player: player,
        edge: edge,
      },
    });

    if (setupPhase) {
      // how do we handle road placement in setupPhase?
      // place the road, then set a new active player
      // If it's the end of a setup phase, start the next phaase
      // if it's the end of the setup phase, start the gameplay phase and shuffle
      // the player array.
      let nextPlayerIndex = null;
      let nextPlayer = null;

      if (setupPhase === SETUP_PHASE_1) {
        if (playerIndex === players.length - 1) {
          // we've reached the end of the first setup round
          // we need to keep the same player active, and set their available
          //    actions to PLACE_SETTLEMENT
          // we need to set setup phase to SETUP_PHASE_2
          playerClone.availableActions = [PLACE_SETTLEMENT];

          dispatch({
            type: UPDATE_PLAYER,
            payload: {
              playerIndex: playerIndex,
              player: playerClone,
            },
          });
          dispatch({
            type: START_SETUP_PHASE_2,
            payload: null,
          });
        } else {
          // still more to do in setup phase 1
          // place the road
          // set the next player to the currently active player
          // update current player and next player with this new information
          // if we're in dev mode, set isThisPlayer for the next player to true

          playerClone.availableActions = [];
          playerClone.isActive = false;
          playerClone.isThisPlayer = devMode ? false : playerClone.isThisPlayer;
          nextPlayerIndex = playerIndex + 1;
          nextPlayer = _.cloneDeep(players[nextPlayerIndex]);
          nextPlayer.availableActions = [PLACE_SETTLEMENT];
          nextPlayer.isActive = true;
          nextPlayer.isThisPlayer = devMode ? true : nextPlayer.isThisPlayer;

          dispatch({
            type: UPDATE_PLAYER,
            payload: {
              playerIndex: playerIndex,
              player: playerClone,
            },
          });
          dispatch({
            type: UPDATE_PLAYER,
            payload: {
              playerIndex: nextPlayerIndex,
              player: nextPlayer,
            },
          });
        }
      } else if (setupPhase === SETUP_PHASE_2) {
        // setup phase 2

        if (playerIndex === 0) {
          // we've reached the end of setup phase 2!
          let newPlayerOrder = _.shuffle(_.cloneDeep(players));
          newPlayerOrder = newPlayerOrder.map((p, i) => {
            p.availableActions = i === 0 ? [ROLL] : [];
            p.currentAction = null;
            p.isActive = i === 0 ? true : false;
            p.isThisPlayer = devMode
              ? i === 0
                ? true
                : false
              : p.isThisPlayer;
            return p;
          });
          const rollOrder = newPlayerOrder.map((p) => p.id);

          dispatch({
            type: UPDATE_PLAYERS,
            payload: newPlayerOrder,
          });

          dispatch({
            type: SET_ROLL_ORDER,
            payload: rollOrder,
          });

          dispatch({
            type: START_GAMEPLAY_PHASE,
            payload: null,
          });
        } else {
          playerClone.availableActions = [];
          playerClone.isActive = false;
          playerClone.isThisPlayer = devMode ? false : playerClone.isThisPlayer;
          nextPlayerIndex = playerIndex - 1;
          nextPlayer = _.cloneDeep(players[nextPlayerIndex]);
          nextPlayer.availableActions = [PLACE_SETTLEMENT];
          nextPlayer.isActive = true;
          nextPlayer.isThisPlayer = devMode ? true : nextPlayer.isThisPlayer;

          dispatch({
            type: UPDATE_PLAYER,
            payload: {
              playerIndex: playerIndex,
              player: playerClone,
            },
          });
          dispatch({
            type: UPDATE_PLAYER,
            payload: {
              playerIndex: nextPlayerIndex,
              player: nextPlayer,
            },
          });
        }
      }
    } else if (gameplayPhase) {
      // normal gameplay road placement behavior
    }
  }
};

// click node action handler

export const handleNodeClick = (node) => (dispatch, getState) => {
  const thisPlayer = _.find(getState().players.players, (p) => p.isThisPlayer);
  const { isActive } = thisPlayer;
  const { availableActions, currentAction } = thisPlayer;
  const { settlement, city } = node;

  // const gameState = getState().gameState;
  const { setupPhase, gameplayPhase } = getState().gameState;
  const currentPhase = !!setupPhase
    ? setupPhase
    : !!gameplayPhase
    ? gameplayPhase
    : null;

  // It's this player's turn
  if (isActive) {
    // PLACE_SETTLEMENT
    if (currentAction === PLACE_SETTLEMENT) {
      placeSettlement(node, thisPlayer)(dispatch, getState);
    }
    // PLACE_CITY
    else if (currentAction === PLACE_CITY) {
      placeCity(node, thisPlayer)(dispatch, getState);
    } else {
      console.log("Nothing to do!");
      console.log(node);
    }
  } else {
    console.log("You ain't active, honey");
    console.log(node);
  }
};

export const handleEdgeClick = (edge) => (dispatch, getState) => {
  const thisPlayer = _.find(getState().players.players, (p) => p.isThisPlayer);
  const { isActive } = thisPlayer;
  const { availableActions, currentAction } = thisPlayer;
  const { road } = edge;

  const gameState = getState().gameState;
  const { setupPhase, gameplayPhase } = getState().gameState;
  const currentPhase = !!setupPhase
    ? setupPhase
    : !!gameplayPhase
    ? gameplayPhase
    : null;

  // It's this player's turn
  if (isActive) {
    // PLACE_ROAD
    if (currentAction === PLACE_ROAD) {
      placeRoad(edge, thisPlayer)(dispatch, getState);
    } else {
      console.log("Nothing to do!");
      console.log(edge);
    }
  } else {
    console.log("You ain't active, honey");
    console.log(edge);
  }
};
