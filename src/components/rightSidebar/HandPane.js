import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { Box } from "grommet";

import Hand from "../hand/Hand";

const HandPane = ({ hand, ...props }) => {
  return (
    <Box direction="column" gap="small">
      <Hand hand={hand} />
    </Box>
  );
};

const mapStateToProps = (state) => {
  const thisPlayer = _.find(state.players.players, (p) => p.isThisPlayer);
  return {
    hand: thisPlayer.hand,
  };
};

export default connect(mapStateToProps, {})(HandPane);
