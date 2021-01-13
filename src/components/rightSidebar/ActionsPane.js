import React from "react";
import { connect } from "react-redux";

import { Box, Button, Text } from "grommet";

import { startRoll } from "../../actions";
import {
  ROLL,
  BUILD,
  BUY,
  TRADE,
  USE,
  STEAL,
  PLACE,
  START_GAME,
} from "../../actions/types";

const ActionsPane = (props) => {
  const { startRoll, availableActions } = props;

  const actionButtons = {};
  actionButtons[START_GAME] = <Button key={START_GAME} label="Start Game" />;
  actionButtons[ROLL] = <Button key={ROLL} label="Roll" onClick={startRoll} />;

  return (
    <Box direction="column" gap="small" align="center">
      <Text>Actions</Text>
      {availableActions.map((action) => actionButtons[action])}
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { availableActions } = state.gameState;
  console.log(availableActions);
  return {
    availableActions: availableActions,
  };
};

export default connect(mapStateToProps, { startRoll })(ActionsPane);
