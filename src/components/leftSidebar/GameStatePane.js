import React from "react";
import { connect } from "react-redux";

import { Box } from "grommet";

import Players from "../player/Players";

const GameStatePane = ({ width, pad, ...props }) => {
  let { players, activePlayerId, thisPlayerId } = props;

  return (
    <Box align="center">
      <Players players={players} thisPlayerId={thisPlayerId} />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    players: state.players.players,
    thisPlayerId: state.gameState.thisPlayerId,
  };
};

export default connect(mapStateToProps, {})(GameStatePane);
