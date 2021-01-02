import React, { useEffect } from "react";
import { connect } from "react-redux";

import { generateBoardState } from "../../actions";
import { buildRowIndices } from "../../util/helpers";

import { Group } from "@visx/group";

import Hexagon from "./tile/Hexagon";

const Board = ({
  width,
  pad = 0,
  tilePadRatio = 0.01, // tilePadRatio is the ratio to the sidelength
  containerBox,
  ...props
}) => {
  const { generateBoardState, numCols } = props;
  useEffect(() => {
    generateBoardState(numCols);
  }, [generateBoardState, numCols]);

  console.log(props.board);

  const containerWidth = containerBox.width;
  const containerHeight = containerBox.height;
  const containerHWRatio = containerHeight / containerWidth;

  const boardCenter = { x: containerWidth / 2, y: containerHeight / 2 };
  const boardHWRatio =
    (2 * (numCols * Math.sqrt(3) + numCols * tilePadRatio - tilePadRatio)) /
    (3 * numCols +
      Math.sqrt(3) * tilePadRatio * numCols -
      Math.sqrt(3) * tilePadRatio +
      1);

  let basis = containerHWRatio < boardHWRatio ? "height" : "width";

  let boardWidth =
    basis === "width"
      ? containerWidth - 2 * pad
      : containerHeight / boardHWRatio - 2 * pad;

  const numRows = numCols * 2 - 1;
  const boardHeight = boardWidth * boardHWRatio;

  const tileSide =
    boardHeight /
    (numCols * Math.sqrt(3) + tilePadRatio * numCols - tilePadRatio);

  let tilePad = tileSide * tilePadRatio;
  const tileWidth = 2 * tileSide;
  const componentWidth = tileWidth + Math.sqrt(3) * tilePad;

  let xs = [];
  let padX = basis === "width" ? pad : 0;
  let minX =
    basis === "width"
      ? boardCenter.x - containerWidth / 2
      : boardCenter.x - boardWidth / 2;
  for (let i = 0; i < numCols; ++i) {
    let x =
      minX +
      padX +
      tileSide +
      i * ((3 * tileSide + Math.sqrt(3) * tilePad) / 2);
    xs.push(x);
  }

  let ys = [];
  let padY = basis === "height" ? pad : 0;
  let minY =
    basis === "height"
      ? boardCenter.y - containerHeight / 2
      : boardCenter.y - boardHeight / 2;

  for (let i = 0; i < numRows; ++i) {
    let y =
      minY +
      padY +
      (Math.sqrt(3) / 2) * tileSide +
      i * ((Math.sqrt(3) * tileSide + tilePad) / 2);
    ys.push(y);
  }

  let middle = parseInt(Math.floor(numCols / 2));
  let tiles = [];

  for (let i = 0; i < numCols; ++i) {
    let offset = Math.ceil(i / 2);
    let directedOffset = Math.pow(-1, i) * offset;
    let columnX = xs[middle + directedOffset];
    let rowsInColumn = numCols - offset;
    let rowIndices = buildRowIndices(rowsInColumn, numCols);
    // console.log(middle + directedOffset, rowIndices);
    rowIndices.forEach((rowIndex) => {
      let rowY = ys[rowIndex];
      tiles.push(
        <Hexagon
          key={`${rowIndex}-${middle + directedOffset}`}
          index={{ col: middle + directedOffset, row: rowIndex }}
          width={componentWidth}
          center={{ x: columnX, y: rowY }}
          pad={tilePad}
        />
      );
    });
  }

  return <Group>{tiles}</Group>;
};

const mapStateToProps = (state) => {
  return {
    board: state.board,
  };
};

export default connect(mapStateToProps, { generateBoardState })(Board);
