import React from "react";

import Board from "./board/Board";

const SvgTest = (props) => {
  const svgDims = [0, 0, 100, 100];
  const viewBoxString = svgDims.map((_) => String(_)).join(" ");
  // console.log(viewBoxString);
  // console.log(window.screen.availWidth);
  // console.log(window.screen.availHeight);
  // console.log(window.screen.width);
  // console.log(window.screen.height);
  // console.log(window.innerWidth);
  // console.log(window.innerHeight);
  let width = window.innerWidth;
  let height = window.innerHeight;

  return (
    <svg viewBox={viewBoxString} width={width} height={height}>
      <rect width="100%" height="100%" fill="white" />
      <Board
        pad={1}
        numCols={7}
        containerBox={{
          x: svgDims[0],
          y: svgDims[1],
          width: svgDims[2] - 2,
          height: svgDims[3] - 2,
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
