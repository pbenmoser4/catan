import React from "react";
import { Box } from "grommet";

import GameBoard from "../board/GameBoard";

const BoardContainer = ({ width, height, background, ...props }) => {
  const svgViewBox = [0, 0, 100, 100];
  return (
    <Box
      width={{ min: `${width}px`, max: `${width}px` }}
      height={{ min: `${height}px`, max: `${height}px` }}
      background="light-2"
    >
      <GameBoard
        svgDims={svgViewBox}
        width={width}
        height={height}
        background={background}
      />
    </Box>
  );
};

export default BoardContainer;
