import React from "react";
import { Box } from "grommet";

import LeftSidebar from "../leftSidebar/LeftSidebar";

const LeftSidebarContainer = ({ width, height, ...props }) => {
  return (
    <Box width={{ min: `${width}px`, max: `${width}px` }}>
      <LeftSidebar height={height} width={width} />
    </Box>
  );
};

export default LeftSidebarContainer;
