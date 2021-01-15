import React from "react";
import { connect } from "react-redux";

import { Box } from "grommet";

import Players from "../player/Players";

const GameStatePane = ({ width, pad, ...props }) => {
  let { players } = props;
  return (
    <Box align="center" direction="column" gap="small">
      <Players players={players} />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    players: state.players.players,
  };
};

export default connect(mapStateToProps, {})(GameStatePane);
