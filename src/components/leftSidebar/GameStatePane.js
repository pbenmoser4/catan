import React from "react";
import { connect } from "react-redux";

import { Box, Text } from "grommet";

import { endRoll } from "../../actions";

import Dice from "./dice/Dice";

const GameStatePane = ({ width, pad, ...props }) => {
  let { dice, endRoll } = props;
  return (
    <Box align="center">
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
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    dice: state.gameState.dice,
  };
};

export default connect(mapStateToProps, { endRoll })(GameStatePane);
