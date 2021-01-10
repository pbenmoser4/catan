import React from "react";

import { Box } from "grommet";

import ActionsPane from "./ActionsPane";

const RightSidebar = ({ height, ...props }) => {
  const actionsHeight = height / 3;
  const handHeight = (height * 2) / 3;
  return (
    <Box
      height={{ min: `${height}px`, max: `${height}px` }}
      border={{ side: "left", color: "black" }}
    >
      <Box
        height={{ min: `${actionsHeight}px`, max: `${actionsHeight}px` }}
        background="dark-5"
        pad="small"
      >
        <ActionsPane />
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
