import { tileColors, tileCounts } from "../util/constants";
import {
  generateArrayFromCountDict,
  buildRowIndices,
  getEdgeIndicesForTileIndex,
  getEdgeIndicesForNodeIndex,
  getNodeIndicesForTileIndex,
  getTileIndicesForNodeIndex,
  lookupStringFromIndex,
} from "../util/helpers";

export const generateBoardState = (numCols) => (dispatch, getState) => {
  let tiles = {};
  let nodes = {};
  let edges = {};
  const randomizedTiles = generateArrayFromCountDict(tileCounts);

  const numLandCols = numCols - 2;
  const boardMiddle = parseInt(Math.floor(numCols / 2));
  const rowOffset = 2; // two rows of ocean at the top before land starts
  for (let i = 0; i < numLandCols; ++i) {
    let offset = Math.ceil(i / 2);
    let directedOffset = Math.pow(-1, i) * offset;
    let columnIndex = boardMiddle + directedOffset;
    let rowsInColumn = numLandCols - offset;
    let rowIndices = buildRowIndices(rowsInColumn, numLandCols, rowOffset);
    rowIndices.forEach((j, i) => {
      let tileIndex = { row: j, col: columnIndex };
      let tileLookup = lookupStringFromIndex(tileIndex);
      tiles[tileLookup] = randomizedTiles.pop();
    });
  }

  console.log(tiles);
};
