import React from "react";

import { Box } from "grommet";

import ActionsPane from "./ActionsPane";
import HandPane from "./HandPane";

const RightSidebar = ({ height, ...props }) => {
  const actionsHeight = (height * 2) / 5;
  const handHeight = (height * 3) / 5;
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
        <HandPane />
      </Box>
    </Box>
  );
};

export default RightSidebar;
