import React from "react";
import { connect } from "react-redux";

import { Box, Text } from "grommet";

import {
  SETUP_PHASE_1,
  SETUP_PHASE_2,
  GAMEPLAY_PHASE,
} from "../../util/constants";

import Players from "../player/Players";

const generateGameStateText = (setupPhase, gameplayPhase, turn) => {
  console.log(setupPhase);
  console.log(gameplayPhase);
  if (setupPhase === SETUP_PHASE_1) {
    console.log("Setup phase 1");
    return "Setup Phase 1";
  } else if (setupPhase === SETUP_PHASE_2) {
    console.log("phase 2");
    return "Setup Phase 2";
  } else if (gameplayPhase === GAMEPLAY_PHASE) {
    console.log("gameplay");
    return `Turn ${turn}`;
  } else {
    return "Waiting...";
  }
};

const GameStatePane = ({ width, pad, ...props }) => {
  let { gameplayPhase, players, setupPhase, turn } = props;

  return (
    <Box align="center" direction="column" gap="medium">
      <Text wight="bold">
        {generateGameStateText(setupPhase, gameplayPhase, turn)}
      </Text>
      <Players players={players} />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    setupPhase: state.gameState.setupPhase,
    gameplayPhase: state.gameState.gameplayPhase,
    turn: state.players.turn,
    players: state.players.players,
  };
};

export default connect(mapStateToProps, {})(GameStatePane);
