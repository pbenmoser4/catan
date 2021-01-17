import React from "react";
import { connect } from "react-redux";

import { Box, Text } from "grommet";

import Players from "../player/Players";

const generateGameStateText = (setupPhase, gameplayPhase, turn) => {
  if (setupPhase) {
    return `Setup Phase ${setupPhase}`;
  } else if (gameplayPhase) {
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
    turn: state.gameState.turn,
    players: state.players.players,
  };
};

export default connect(mapStateToProps, {})(GameStatePane);
