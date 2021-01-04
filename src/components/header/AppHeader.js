import React from "react";

import { Header } from "grommet";

const AppHeader = (props) => {
  const { height } = props;
  return (
    <Header background="light-2" pad="medium" height={`${height}px`}>
      Hey sup
    </Header>
  );
};

export default AppHeader;
