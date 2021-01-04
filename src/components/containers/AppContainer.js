import React from "react";

import { getAppDimensionsForWindowBox } from "../../util/helpers";

import { Box } from "grommet";

import Board from "../board/Board";
import AppHeader from "../header/AppHeader";

const AppContainer = (props) => {
  const svgDims = [0, 0, 100, 100];
  const viewBoxString = svgDims.map((_) => String(_)).join(" ");
  let width = window.innerWidth;
  let height = window.innerHeight;

  let dims = getAppDimensionsForWindowBox(width, height);
  console.log(dims);

  return (
    <Box direction="column">
      <AppHeader height={dims.headerHeight} />
      <svg
        viewBox={viewBoxString}
        width={dims.boardWidth}
        height={dims.boardHeight}
      >
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
    </Box>
  );
};

export default AppContainer;
