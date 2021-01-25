import React from "react";
import { connect } from "react-redux";

import { addPlayer } from "../../actions";
import { setInitialStateForTesting } from "../../actions/setup";

import { Box, Button, Header, Text } from "grommet";

const addPlayerButtonClicked = (name, addPlayerFunction) => {
  addPlayerFunction(name)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => console.log(e.message));
};

const AppHeader = (props) => {
  const { height, addPlayer, setInitialStateForTesting } = props;
  return (
    <Header
      background="brand"
      pad={{ left: "medium", right: "medium" }}
      height={{ min: `${height}px`, max: `${height}px` }}
      elevation="large"
    >
      <Text>CATAN!</Text>
      <Box direction="row">
        <Button
          label="add player"
          onClick={() => addPlayerButtonClicked("John", addPlayer)}
        />
        <Button
          label="test setup"
          onClick={() => setInitialStateForTesting()}
        />
      </Box>
    </Header>
  );
};

export default connect(null, { addPlayer, setInitialStateForTesting })(
  AppHeader
);
