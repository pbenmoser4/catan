import React from "react";
import { connect } from "react-redux";

import { Avatar, Box, Text } from "grommet";
import { Fireball } from "grommet-icons";

import { getCardCountForHand } from "../../util/helpers";

import HiddenDevelopmentCard from "../cards/HiddenDevelopmentCard";
import HiddenResourceCard from "../cards/HiddenResourceCard";

const PlayerDisplay = ({ player, thisPlayer, ...props }) => {
  const { hand, isActive } = player;
  console.log(player.displayName, isActive);
  const numDevelopmentCards = getCardCountForHand(hand.developmentCards);
  const numResourceCards = getCardCountForHand(hand.resourceCards);

  return (
    <Box
      direction="row"
      gap="small"
      align="center"
      justify="center"
      pad="xsmall"
      background={isActive ? "light-4" : null}
      border={isActive ? { color: "dark-1", size: "small" } : null}
      round="small"
    >
      <Avatar
        size="medium"
        background={player.color}
        border={{ color: "dark-2", size: "small" }}
      >
        {player.icon}
      </Avatar>
      <Box direction="column" align="start" gap="small">
        <Box direction="row" gap="small">
          <Text
            size={thisPlayer ? "large" : "medium"}
            weight={thisPlayer ? "bold" : "normal"}
          >
            {player.displayName}
          </Text>
          {thisPlayer && <Fireball size="medium" color="dark-1" />}
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
    </Box>
  );
};

export default PlayerDisplay;
