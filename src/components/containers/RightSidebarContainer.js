import React from "react";
import { Box } from "grommet";

import RightSidebar from "../rightSidebar/RightSidebar";

const RightSidebarContainer = ({ width, height, ...props }) => {
  return (
    <Box background="light-5" width={{ min: `${width}px`, max: `${width}px` }}>
      <RightSidebar height={height} />
    </Box>
  );
};

export default RightSidebarContainer;
