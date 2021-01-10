import _ from "lodash";

import { SET_BOARD_STATE, SET_BOARD_DIMENSIONS } from "./types";
import {
  ports,
  portCounts,
  tileCounts,
  DESERT,
  RESOURCE,
  WATER,
  PORT_RESOURCE,
  PORT_DIRECTION,
} from "../util/constants";
import {
  generateArrayFromCountDict,
  buildRowIndices,
  generatePipPlacementArray,
  getEdgeIndicesForTileIndex,
  getNodeIndicesForTileIndex,
  getTileIndicesForNodeIndex,
  getBoardLayout,
} from "../util/helpers";

export const generateBoardState = (numCols) => (dispatch, getState) => {
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
        if (PORT_DIRECTION === "ur") {
          return PORT_RESOURCE;
        } else {
          return undefined;
        }
      case "ul":
        if (PORT_DIRECTION === "dr") {
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
        if (PORT_DIRECTION === "dl") {
          return PORT_RESOURCE;
        } else {
          return undefined;
        }
      case "dr":
        if (PORT_DIRECTION === "ul") {
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
