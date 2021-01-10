import React from "react";
import { Box } from "grommet";

const RightSidebar = ({ height, ...props }) => {
  const actionsHeight = height / 2;
  const handHeight = height / 2;
  return (
    <Box height={{ min: `${height}px`, max: `${height}px` }}>
      <Box
        height={{ min: `${actionsHeight}px`, max: `${actionsHeight}px` }}
        background="dark-5"
        pad="small"
      >
        Actions
      </Box>
      <Box
        height={{ min: `${handHeight}px`, max: `${handHeight}px` }}
        background="dark-3"
        pad="small"
      >
        Hand
      </Box>
    </Box>
  );
};

export default RightSidebar;
