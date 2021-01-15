import React from "react";

import { getAppDimensionsForWindowBox } from "../../util/helpers";

import Board from "./Board";

const GameBoard = ({ width, height, svgDims, background }) => {
  const viewBoxString = svgDims.map((_) => String(_)).join(" ");
  let dims = getAppDimensionsForWindowBox(width, height);
  let boardPad = 1;
  return (
    <svg viewBox={viewBoxString} width={width} height={height}>
      <rect
        width="100%"
        height="100%"
        fill={background ? background : "white"}
        fillOpacity={background ? 1.0 : 0.0}
      />
      <Board
        pad={boardPad}
        numCols={7}
        containerBox={{
          x: svgDims[0],
          y: svgDims[1],
          width: svgDims[2] - 2 * boardPad,
          height: svgDims[3] - 2 * boardPad,
        }}
      />
    </svg>
  );
};

export default GameBoard;
