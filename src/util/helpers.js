import _ from "lodash";

export const generateArrayFromCountDict = (countDict, randomize = true) => {
  let arr = [];
  _.each(_.keys(countDict), (key, i) => {
    let count = countDict[key];
    let vals = [];
    for (let i = 0; i < count; ++i) {
      vals.push(key);
    }
    arr.push(...vals);
  });
  if (randomize) {
    arr = _.sortBy(arr, (_) => Math.random());
  }
  return arr;
};

export const buildRowIndices = (rowsInColumn, maxRows, rowOffset = 0) => {
  let startIndex = maxRows - rowsInColumn;
  let indices = [];
  for (let i = 0; i < rowsInColumn; ++i) {
    indices.push(startIndex + 2 * i + rowOffset);
  }
  return indices;
};

export const getNodeIndicesForTileIndex = (tileIndex) => {
  const { row, col } = tileIndex;
  let arr = [];
  for (let i = 0; i < 3; ++i) {
    let edgeRow = row + i;
    if (i % 2 === 0) {
      let colStart = col + 4;
      arr.push(
        ...[
          { row: edgeRow, col: colStart },
          { row: edgeRow, col: colStart + 1 },
        ]
      );
    } else {
      let colStart = col + 3;
      arr.push(
        ...[
          { row: edgeRow, col: colStart },
          { row: edgeRow, col: colStart + 3 },
        ]
      );
    }
  }
  return arr;
};

export const getEdgeIndicesForTileIndex = (tileIndex) => {
  const { row, col } = tileIndex;
  let arr = [];
  let edgeStartCol = col * 2;
  let edgeTopRow = row * 2;
  let edgeBottomRow = edgeTopRow + 4;
  for (let i = 0; i < 3; ++i) {
    arr.push({ row: edgeTopRow + ((i + 1) % 2), col: edgeStartCol + i });
    arr.push({ row: edgeBottomRow - ((i + 1) % 2), col: edgeStartCol + i });
  }
  return arr;
};

export const getEdgeIndicesForNodeIndex = (nodeIndex) => {
  // this will technically return some edges that aren't a part of the board, if
  // the input is a node idex on the edge of the board. In effect, this should
  // never happen though, becuase we build the board around internal (land) tiles.
  let { row, col } = nodeIndex;
  let edgeStartRow = row * 2 - 1;
  let edgeStartCol = col - 1;
  let arr = [];
  for (let i = 0; i < 3; ++i) {
    // even numbers have two to the right, odd two to the left
    if (edgeStartRow + i > 0 && edgeStartCol + ((col + i + 1) % 2) > 0) {
      arr.push({
        row: edgeStartRow + i,
        col: edgeStartCol + ((col + i + 1) % 2),
      });
    }
  }
  return arr;
};

export const getTileIndicesForNodeIndex = (nodeIndex) => {
  const { row, col } = nodeIndex;

  let rowStart = row - 2;
  let colStart = (col - (col % 2)) / 2 - 1;

  let arr = [];

  for (let i = 0; i < 3; ++i) {
    arr.push({
      row: rowStart + i,
      col: col % 2 == 0 ? colStart + (i % 2) : colStart + ((i + 1) % 2),
    });
  }

  return arr;
};

export const lookupStringFromIndex = (idx) => {
  return `${idx.row}-${idx.col}`;
};

export const indexFromLookupString = (str) => {
  let vals = str.split("-");
  return { row: parseInt(vals[0]), col: parseInt(vals[1]) };
};
