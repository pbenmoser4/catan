import React from "react";
import { Box } from "grommet";

const LeftSidebar = ({ height, ...props }) => {
  const playersHeight = height / 2;
  const chatHeight = height / 2;
  return (
    <Box height={{ min: `${height}px`, max: `${height}px` }}>
      <Box
        height={{ min: `${playersHeight}px`, max: `${playersHeight}px` }}
        background="dark-5"
        pad="small"
      >
        Players
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
