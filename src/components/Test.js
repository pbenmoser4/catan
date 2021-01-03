import React from "react";

import Board from "./board/Board";

const SvgTest = (props) => {
  const svgDims = [0, 0, 100, 100];
  const viewBoxString = svgDims.map((_) => String(_)).join(" ");
  console.log(viewBoxString);
  return (
    <svg viewBox={viewBoxString} width="100%" height="100%" id="svg-container">
      <rect width="100%" height="100%" fill="white" />
      <Board
        pad={1}
        numCols={7}
        containerBox={{
          x: svgDims[0],
          y: svgDims[1],
          width: svgDims[2],
          height: svgDims[3],
        }}
      />
    </svg>
  );
};

const Test = (props) => {
  return (
    <div>
      <SvgTest />
    </div>
  );
};

export default Test;
