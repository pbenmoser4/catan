import _ from "lodash";

import { pips, EDGE, NODE, TILE } from "./constants";

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

export const distanceBetweenIndices = (idx1, idx2) => {
  let row1 = idx1.row;
  let row2 = idx2.row;
  let col1 = idx1.col;
  let col2 = idx2.col;
  return Math.sqrt(Math.pow(col1 - col2, 2) + Math.pow(row1 - row2, 2));
};

export const tileCenterForIndex = (idx, numCols) => {};

// Get information about the board around a given tile

export const getNodeIndicesForTileIndex = (tileIndex) => {
  const { row, col } = tileIndex;
  let arr = [];
  for (let i = 0; i < 3; ++i) {
    let edgeRow = row + i;
    if (i % 2 === 0) {
      let colStart = 2 * col + 1;
      arr.push(
        ...[
          { row: edgeRow, col: colStart },
          { row: edgeRow, col: colStart + 1 },
        ]
      );
    } else {
      let colStart = col * 2;
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
    arr.push({
      row: edgeTopRow + ((i + 1) % 2),
      col: edgeStartCol + i,
      direction: i === 0 ? "up" : i === 1 ? "flat" : "down",
    });
    arr.push({
      row: edgeBottomRow - ((i + 1) % 2),
      col: edgeStartCol + i,
      direction: i === 0 ? "down" : i === 1 ? "flat" : "up",
    });
  }
  return arr;
};

// Get information about the board around a given node

export const getEdgeIndicesForNodeIndex = (nodeIndex) => {
  // this will technically return some edges that aren't a part of the board, if
  // the input is a node idex on the edge of the board. In effect, this should
  // never happen though, becuase we build the board around internal (land) tiles.
  let { row, col } = nodeIndex;
  let edgeStartRow = row * 2 - 1;
  let edgeStartCol = col - 1;
  let arr = [];

  const evenColumnDirections = ["up", "flat", "down"];
  const oddColumnDirections = ["down", "flat", "up"];
  for (let i = 0; i < 3; ++i) {
    // even numbered cols have two to the right, odd two to the left
    if (edgeStartRow + i > 0 && edgeStartCol + ((col + i + 1) % 2) > 0) {
      arr.push({
        row: edgeStartRow + i,
        col: edgeStartCol + ((col + i + 1) % 2),
        direction:
          col % 2 === 0 ? evenColumnDirections[i] : oddColumnDirections[i],
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
      col: col % 2 === 0 ? colStart + (i % 2) : colStart + ((i + 1) % 2),
    });
  }

  return arr;
};

// Get information about the board around a given edge

export const getNodeIndicesForEdgeIndex = ({ row, col, direction }) => {
  let nodeStartRow = Math.floor(row / 2);
  let rowIncrement = direction === "flat" ? 0 : 1;
  let nodeStartCol = direction === "up" ? col + 1 : col;
  let colIncrement = direction === "up" ? -1 : 1;
  return [
    { row: nodeStartRow, col: nodeStartCol },
    { row: nodeStartRow + rowIncrement, col: nodeStartCol + colIncrement },
  ];
};

// port nodes

export const portNodes = [{ row: 0, col: 0 }];

//// TODO: remove these, I don't think they're necessary

export const lookupStringFromIndex = (idx) => {
  return `${idx.row}-${idx.col}`;
};

export const indexFromLookupString = (str) => {
  let vals = str.split("-");
  return { row: parseInt(vals[0]), col: parseInt(vals[1]) };
};

const getBoardHWRatio = (numCols, tilePadRatio) => {
  return (
    (2 * (numCols * Math.sqrt(3) + numCols * tilePadRatio - tilePadRatio)) /
    (3 * numCols +
      Math.sqrt(3) * tilePadRatio * numCols -
      Math.sqrt(3) * tilePadRatio +
      1)
  );
};

const generateTileXCoordinateArray = (
  minX,
  padX,
  tileSide,
  tilePad,
  numCols
) => {
  let xs = [];
  for (let i = 0; i < numCols; ++i) {
    let x =
      minX +
      padX +
      tileSide +
      i * ((3 * tileSide + Math.sqrt(3) * tilePad) / 2);
    xs.push(x);
  }
  return xs;
};

const generateTileYCoordinateArray = (
  minY,
  padY,
  tileSide,
  tilePad,
  numRows
) => {
  let ys = [];
  for (let i = 0; i < numRows; ++i) {
    let y =
      minY +
      padY +
      (Math.sqrt(3) / 2) * tileSide +
      i * ((Math.sqrt(3) * tileSide + tilePad) / 2);
    ys.push(y);
  }
  return ys;
};

const generateNodeXCoordinateArray = (
  tileXCoordinateArray,
  tileSide,
  tilePad
) => {
  const r = 0.288675 * tilePad;
  const R = (Math.sqrt(3) / 2 - 0.288675) * tilePad;
  let nodeXs = [];
  tileXCoordinateArray.forEach((x, i) => {
    let coords = [
      x - tileSide - R,
      x - tileSide / 2 - r,
      x + tileSide / 2 + r,
      x + tileSide + R,
    ];
    nodeXs = _.unionBy(nodeXs, coords, (_) => Number(_.toFixed(4)));
  });
  return nodeXs.sort((a, b) => parseFloat(a) - parseFloat(b));
};

const generateNodeYCoordinateArray = (
  tileYCoordinateArray,
  tileSide,
  tilePad
) => {
  let nodeYs = [];
  const increment = (Math.sqrt(3) / 2) * tileSide;
  tileYCoordinateArray.forEach((y, i) => {
    let coords = [y - increment - tilePad / 2, y, y + increment + tilePad / 2];
    nodeYs = _.unionBy(nodeYs, coords, (_) => Number(_.toFixed(4)));
  });
  return nodeYs.sort((a, b) => parseFloat(a) - parseFloat(b));
};

export const getBoardLayout = (containerBox, numCols, tilePadRatio, pad) => {
  let layout = {};
  let coords = {};

  const containerWidth = containerBox.width;
  const containerHeight = containerBox.height;
  const containerHWRatio = containerHeight / containerWidth;

  const boardCenter = { x: containerWidth / 2, y: containerHeight / 2 };
  layout["center"] = boardCenter;
  const boardHWRatio =
    (2 * (numCols * Math.sqrt(3) + numCols * tilePadRatio - tilePadRatio)) /
    (3 * numCols +
      Math.sqrt(3) * tilePadRatio * numCols -
      Math.sqrt(3) * tilePadRatio +
      1);

  let basis = containerHWRatio < boardHWRatio ? "height" : "width";
  layout["basis"] = basis;

  let boardWidth =
    basis === "width"
      ? containerWidth - 2 * pad
      : containerHeight / boardHWRatio - 2 * pad;

  const numRows = numCols * 2 - 1;
  layout["numRows"] = numRows;
  layout["numCols"] = numCols;
  const boardHeight = boardWidth * boardHWRatio;
  layout["boardWidth"] = boardWidth;
  layout["boardHeight"] = boardHeight;

  const tileSide =
    boardHeight /
    (numCols * Math.sqrt(3) + tilePadRatio * numCols - tilePadRatio);
  layout["tileSide"] = tileSide;

  const tilePad = tileSide * tilePadRatio;
  layout["tilePad"] = tilePad;
  const tileWidth = 2 * tileSide;
  layout["tileWidth"] = tileWidth;
  const tileHeight = Math.sqrt(3) * tileSide;
  layout["tileHeight"] = tileHeight;
  const componentWidth = tileWidth + Math.sqrt(3) * tilePad;
  layout["componentWidth"] = componentWidth;
  const componentHeight = tileHeight + tilePad;
  layout["componentHeight"] = componentHeight;

  const padX = basis === "width" ? pad : 0;
  const minX =
    basis === "width"
      ? boardCenter.x - containerWidth / 2
      : boardCenter.x - boardWidth / 2;

  const padY = basis === "height" ? pad : 0;
  const minY =
    basis === "height"
      ? boardCenter.y - containerHeight / 2
      : boardCenter.y - boardHeight / 2;

  const tileXs = generateTileXCoordinateArray(
    minX,
    padX,
    tileSide,
    tilePad,
    numCols
  );
  const nodeXs = generateNodeXCoordinateArray(tileXs, tileSide, tilePad);

  const tileYs = generateTileYCoordinateArray(
    minY,
    padY,
    tileSide,
    tilePad,
    numRows
  );
  const nodeYs = generateNodeYCoordinateArray(tileYs, tileSide, tilePad);

  coords[TILE] = { xs: tileXs, ys: tileYs };
  coords[NODE] = { xs: nodeXs, ys: nodeYs };
  layout["coords"] = coords;

  return layout;
};

export const getCenterForIndex = (idx, coords) => {
  const { row, col } = idx;
  const { xs, ys } = coords;
  return { x: xs[col], y: ys[row] };
};

export const pipsForPipNumber = (number) => {
  let pips = 6 - Math.abs(number - 7);
  return "•".repeat(pips).trim();
};

export const generatePipPlacementArray = (centerIndex, desertIndex) => {
  const placementArray = [];
  const centerRow = centerIndex.row;
  const centerCol = centerIndex.col;

  let pipCopy = _.cloneDeep(pips);

  let ringOffset = 2;
  for (let i = 0; i < ringOffset * 6; ++i) {
    let theta = (Math.PI / 6) * (i + 1);
    let colOffset = Math.round(Math.cos(theta) * ringOffset);
    let rowOffset = -Math.round(Math.sin(theta) * 2 * ringOffset);
    let idx = {
      row: centerRow + rowOffset,
      col: centerCol + colOffset,
    };
    if (idx.row === desertIndex.row && idx.col === desertIndex.col) {
      continue;
    }
    idx["number"] = pipCopy.shift();
    placementArray.push(idx);
  }

  ringOffset = 1;
  for (let i = 0; i < 6; ++i) {
    let theta = (Math.PI / 6) * (2 * i + 1);
    let colOffset = Math.round(Math.cos(theta) * ringOffset);
    let rowOffset = -Math.round(Math.sin(theta) * 2 * ringOffset);
    let idx = {
      row: centerRow + rowOffset,
      col: centerCol + colOffset,
    };
    if (idx.row === desertIndex.row && idx.col === desertIndex.col) {
      continue;
    }
    idx["number"] = pipCopy.shift();
    placementArray.push(idx);
  }

  if (
    !(
      centerIndex.row === desertIndex.row || centerIndex.col === desertIndex.col
    )
  ) {
    placementArray.push({ ...centerIndex, number: pipCopy.shift() });
  }

  return placementArray;
};
