import React, { useState } from "react";
import { Polygon } from "@visx/shape";

import Board from "./board/Board";

const SvgTest = (props) => {
  const svgDims = [0, 0, 100, 150];
  const viewBoxString = svgDims.map((_) => String(_)).join(" ");
  console.log(viewBoxString);
  return (
    <svg viewBox={viewBoxString} width="100%" height="100%" id="svg-container">
      <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      <Board
        width={100}
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
