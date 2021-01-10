import React, { useEffect, useState } from "react";

import { getAppDimensionsForWindowBox } from "../../util/helpers";

import { Box } from "grommet";

import AppHeader from "../header/AppHeader";
import BoardContainer from "./BoardContainer";
import LeftSidebarContainer from "./LeftSidebarContainer";
import RightSidebarContainer from "./RightSidebarContainer";

const AppContainer = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  let dims = getAppDimensionsForWindowBox(width, height);
  return (
    <Box direction="column">
      <AppHeader height={dims.headerHeight} />
      <Box direction="row">
        <LeftSidebarContainer
          width={dims.sidebarWidth}
          height={dims.boardHeight}
        />
        <BoardContainer width={dims.boardWidth} height={dims.boardHeight} />
        <RightSidebarContainer
          width={dims.sidebarWidth}
          height={dims.boardHeight}
        />
      </Box>
    </Box>
  );
};

export default AppContainer;
