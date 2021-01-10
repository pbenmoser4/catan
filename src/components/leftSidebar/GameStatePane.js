import React from "react";

import { Box } from "grommet";

import Dice from "./Dice";

const GameStatePane = ({ width, pad, ...props }) => {
  return (
    <Box align="center">
      <Dice width={width} pad={pad} />
    </Box>
  );
};

export default GameStatePane;
