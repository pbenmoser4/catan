import React from "react";

import { Box } from "grommet";

import GameStatePane from "./GameStatePane";

const LeftSidebar = ({ height, width, ...props }) => {
  const gameStateHeight = (height * 2) / 3;
  const chatHeight = height / 3;
  return (
    <Box height={{ min: `${height}px`, max: `${height}px` }}>
      <Box
        height={{ min: `${gameStateHeight}px`, max: `${gameStateHeight}px` }}
        background="dark-5"
        pad="small"
      >
        <GameStatePane width={width} pad={24} />
      </Box>
      <Box
        height={{ min: `${chatHeight}px`, max: `${chatHeight}px` }}
        background="dark-3"
        pad="small"
      >
        Chat
      </Box>
    </Box>
  );
};

export default LeftSidebar;
