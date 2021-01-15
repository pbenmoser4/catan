import React from "react";
import { connect } from "react-redux";

import { Box, Text } from "grommet";

import { endRoll } from "../../actions";

import Dice from "./dice/Dice";
import Players from "../player/Players";

const GameStatePane = ({ width, pad, ...props }) => {
  let { dice, endRoll, players } = props;
  return (
    <Box align="center" direction="column" gap="small">
      <Box direction="column" align="center" gap="small" pad="small">
        <Dice
          width={width}
          pad={pad}
          animating={dice.rolling}
          onAnimationFinished={endRoll}
          numbers={dice.numbers}
        />
        <Text size="large" wight="heavy">
          {dice.roll}
        </Text>
      </Box>
      <Players players={players} />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    dice: state.gameState.dice,
    players: state.players.players,
  };
};

export default connect(mapStateToProps, { endRoll })(GameStatePane);
