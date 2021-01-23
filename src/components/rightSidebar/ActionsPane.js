import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { Box, Button, Text } from "grommet";

import {
  startRoll,
  startGame,
  startPlaceRoadAction,
  startPlaceSettlementAction,
} from "../../actions";
import { START_GAME, PLACE_SETTLEMENT, PLACE_ROAD } from "../../actions/types";
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

const actionButton = (key, func, disabled) => {
  const labels = actionLabels[key];
  const label = disabled ? labels.disabled : labels.enabled;
  return <Button key={key} label={label} onClick={func} primary={!disabled} />;
};

const ActionsPane = (props) => {
  const {
    startRoll,
    startGame,
    availableActions,
    currentAction,
    thisPlayer,
    startPlaceRoadAction,
    startPlaceSettlementAction,
  } = props;

  const actionButtons = {};
  actionButtons[BUILD] = actionButton(BUILD, () => console.log("Build"));
  actionButtons[BUY] = actionButton(BUY, () => console.log("Buy"));
  actionButtons[END] = actionButton(END, () => console.log("End Turn"));
  actionButtons[PLACE] = actionButton(PLACE, () => console.log("Place"));
  actionButtons[ROLL] = actionButton(ROLL, () => startRoll());
  actionButtons[START_GAME] = actionButton(
    START_GAME,
    () => startGame(),
    thisPlayer.currentAction === START_GAME
  );
  actionButtons[STEAL] = actionButton(STEAL, () => console.log("steal"));
  actionButtons[TRADE] = actionButton(TRADE, () => console.log("Trade"));
  actionButtons[USE] = actionButton(USE, () => console.log("Use D Card"));
  actionButtons[PLACE_ROAD] = actionButton(
    PLACE_ROAD,
    () => {
      if (thisPlayer.currentAction === PLACE_ROAD) {
        console.log("cancel action");
      } else {
        startPlaceRoadAction(thisPlayer);
      }
    },
    thisPlayer.currentAction === PLACE_ROAD
  );
  actionButtons[PLACE_SETTLEMENT] = actionButton(
    PLACE_SETTLEMENT,
    () => {
      if (thisPlayer.currentAction === PLACE_SETTLEMENT) {
        console.log("Cancel action");
      } else {
        startPlaceSettlementAction(thisPlayer);
      }
    },
    thisPlayer.currentAction === PLACE_SETTLEMENT
  );

  return (
    <Box direction="column" gap="small" align="center">
      <Text>Actions</Text>
      {availableActions.map((action) => actionButtons[action])}
    </Box>
  );
};

const mapStateToProps = (state) => {
  const thisPlayer = _.find(state.players.players, (p) => p.isThisPlayer);

  const { availableActions, currentAction } = thisPlayer;
  return {
    thisPlayer: thisPlayer,
    availableActions: availableActions,
    currentAction: currentAction,
  };
};

export default connect(mapStateToProps, {
  startRoll,
  startGame,
  startPlaceRoadAction,
  startPlaceSettlementAction,
})(ActionsPane);
