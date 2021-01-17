import React from "react";
import { connect } from "react-redux";

import { Avatar, Box, Text } from "grommet";
import { Fireball } from "grommet-icons";

import { getCardCountForHand } from "../../util/helpers";

import HiddenDevelopmentCard from "../cards/HiddenDevelopmentCard";
import HiddenResourceCard from "../cards/HiddenResourceCard";

const PlayerDisplay = ({ player, active, ...props }) => {
  const { hand } = player;
  const numDevelopmentCards = getCardCountForHand(hand.developmentCards);
  const numResourceCards = getCardCountForHand(hand.resourceCards);
  return (
    <Box direction="column" gap="small" align="center">
      <Box direction="row" gap="xsmall" align="center">
        {active && <Fireball size="medium" color="dark-1" />}
        <Avatar
          size="medium"
          background={player.color}
          border={{ color: "dark-2", size: "small" }}
        >
          {player.icon}
        </Avatar>
        <Text
          size={active ? "large" : "medium"}
          weight={active ? "bold" : "normal"}
        >
          {player.displayName}
        </Text>
      </Box>
      <Box direction="row" gap="small">
        <HiddenResourceCard
          width="33px"
          height="50px"
          count={numResourceCards}
        />
        <HiddenDevelopmentCard
          width="33px"
          height="50px"
          count={numDevelopmentCards}
        />
      </Box>
    </Box>
  );
};

export default PlayerDisplay;
