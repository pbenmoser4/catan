import _ from "lodash";

import { SET_BOARD_STATE } from "./types";
import { tileCounts, RESOURCE } from "../util/constants";
import {
  generateArrayFromCountDict,
  buildRowIndices,
  getEdgeIndicesForTileIndex,
  getNodeIndicesForTileIndex,
} from "../util/helpers";

export const generateBoardState = (numCols) => (dispatch, getState) => {
  let tiles = [];
  let nodes = [];
  let edges = [];
  // Take the dictionary of tile counts and turn it into a randomized array based
  // on the tile counts.
  const randomizedTiles = generateArrayFromCountDict(tileCounts);
  // always one ocean column on either side of the board
  const numLandCols = numCols - 2;
  const boardMiddle = parseInt(Math.floor(numCols / 2));
  const rowOffset = 2; // two rows of ocean at the top before land starts

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
    rowIndices.forEach((j, i) => {
      let tileIndex = { row: j, col: columnIndex };

      let tile = {};
      tile = { ...tileIndex };
      tile[RESOURCE] = randomizedTiles.pop();
      tiles.push(tile);

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
    nodes = _.unionBy(nodes, columnNodes, ({ row, col }) => `${row}${col}`);
    edges = _.unionBy(edges, columnEdges, ({ row, col }) => `${row}${col}`);
  }

  dispatch({
    type: SET_BOARD_STATE,
    payload: {
      tiles: tiles,
      nodes: nodes,
      edges: edges,
    },
  });
};
