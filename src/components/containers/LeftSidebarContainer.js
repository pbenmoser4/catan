import React from "react";
import { Box } from "grommet";

import LeftSidebar from "../leftSidebar/LeftSidebar";

const LeftSidebarContainer = ({ width, height, ...props }) => {
  return (
    <Box background="light-5" width={{ min: `${width}px`, max: `${width}px` }}>
      <LeftSidebar height={height} />
    </Box>
  );
};

export default LeftSidebarContainer;
