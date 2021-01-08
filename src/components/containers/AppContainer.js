import React from "react";

import { getAppDimensionsForWindowBox } from "../../util/helpers";

import { Box } from "grommet";

import Board from "../board/Board";
import GameBoard from "../board/GameBoard";
import AppHeader from "../header/AppHeader";

const AppContainer = (props) => {
  const svgDims = [0, 0, 100, 100];
  const viewBoxString = svgDims.map((_) => String(_)).join(" ");
  let width = window.innerWidth;
  let height = window.innerHeight;

  let dims = getAppDimensionsForWindowBox(width, height);
  return (
    <Box direction="column">
      <AppHeader height={dims.headerHeight} />
      <Box direction="row">
        <GameBoard
          svgDims={svgDims}
          width={dims.boardWidth}
          height={dims.boardHeight}
        />
      </Box>
    </Box>
  );
};

export default AppContainer;
