import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { Box, Button, Text } from "grommet";

import { startRoll, startGame } from "../../actions";
import { PLACE_SETTLEMENT } from "../../actions/types";
import {
  BUILD,
  BUY,
  END,
  PLACE,
  ROLL,
  START,
  STEAL,
  TRADE,
  USE,
  actionLabels,
} from "../../util/constants";

const actionButton = (key, func) => {
  return <Button key={key} label={actionLabels[key]} onClick={func} />;
};

const ActionsPane = (props) => {
  const { startRoll, startGame, availableActions } = props;

  const actionButtons = {};
  actionButtons[BUILD] = actionButton(BUILD, () => console.log("Build"));
  actionButtons[BUY] = actionButton(BUY, () => console.log("Buy"));
  actionButtons[END] = actionButton(END, () => console.log("End Turn"));
  actionButtons[PLACE] = actionButton(PLACE, () => console.log("Place"));
  actionButtons[ROLL] = actionButton(ROLL, () => startRoll());
  actionButtons[START] = actionButton(START, () => startGame());
  actionButtons[STEAL] = actionButton(STEAL, () => console.log("steal"));
  actionButtons[TRADE] = actionButton(TRADE, () => console.log("Trade"));
  actionButtons[USE] = actionButton(USE, () => console.log("Use D Card"));
  actionButtons[PLACE_SETTLEMENT] = actionButton(PLACE_SETTLEMENT, () =>
    console.log("Place settlement")
  );

  return (
    <Box direction="column" gap="small" align="center">
      <Text>Actions</Text>
      {availableActions.map((action) => actionButtons[action])}
    </Box>
  );
};

const mapStateToProps = (state) => {
  // const { availableActions } = state.gameState;

  const thisPlayer = _.find(
    state.players.players,
    (player) => player.isThisPlayer
  );

  const { availableActions } = thisPlayer;
  return {
    availableActions: availableActions,
  };
};

export default connect(mapStateToProps, { startRoll, startGame })(ActionsPane);
