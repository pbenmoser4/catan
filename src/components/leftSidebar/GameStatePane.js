import React from "react";
import { connect } from "react-redux";

import { Box } from "grommet";

import Players from "../player/Players";

const GameStatePane = ({ width, pad, ...props }) => {
  let { players, activePlayerId } = props;

  return (
    <Box align="center">
      <Players players={players} activePlayerId={activePlayerId} />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    players: state.players.players,
    activePlayerId: state.gameState.activePlayerId,
  };
};

export default connect(mapStateToProps, {})(GameStatePane);
