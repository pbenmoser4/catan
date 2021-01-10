import React from "react";

import { Header } from "grommet";

const AppHeader = (props) => {
  const { height } = props;
  return (
    <Header
      background="brand"
      pad={{ left: "medium", right: "medium" }}
      height={{ min: `${height}px`, max: `${height}px` }}
      elevation="large"
    >
      CATAN!
    </Header>
  );
};

export default AppHeader;
