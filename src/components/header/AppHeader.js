import React from "react";
import { connect } from "react-redux";

import { addPlayer } from "../../actions";

import { Button, Header, Text } from "grommet";

const addPlayerButtonClicked = (name, addPlayerFunction) => {
  addPlayerFunction(name)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => console.log(e.message));
};

const AppHeader = (props) => {
  const { height, addPlayer } = props;
  return (
    <Header
      background="brand"
      pad={{ left: "medium", right: "medium" }}
      height={{ min: `${height}px`, max: `${height}px` }}
      elevation="large"
    >
      <Text>CATAN!</Text>
      <Button
        label="add player"
        onClick={() => addPlayerButtonClicked("John", addPlayer)}
      />
    </Header>
  );
};

export default connect(null, { addPlayer })(AppHeader);
