import React from "react";
import { connect } from "react-redux";

import { Box, Text } from "grommet";

import { endRoll } from "../../actions";

import Dice from "../dice/Dice";

const DiceContainer = ({ width, height, ...props }) => {
  const { dice, endRoll } = props;
  return (
    <Box
      height={{ min: `${height}px`, max: `${height}px` }}
      width={{ min: `${width}px`, max: `${width}px` }}
      background="light-5"
      justify="center"
      align="center"
      direction="row"
      gap="medium"
    >
      <Dice
        width={120}
        animating={dice.rolling}
        numbers={dice.numbers}
        pad={0}
        onAnimationFinished={endRoll}
      />
      <Text size="xlarge" weight="bold">
        {dice.roll}
      </Text>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    dice: state.gameState.dice,
  };
};

export default connect(mapStateToProps, { endRoll })(DiceContainer);
