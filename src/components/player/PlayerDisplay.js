import React from "react";
import { connect } from "react-redux";

import { Avatar, Box, Text } from "grommet";
import { Fireball } from "grommet-icons";

import { getCardCountForHand } from "../../util/helpers";

import HiddenDevelopmentCard from "../cards/HiddenDevelopmentCard";
import HiddenResourceCard from "../cards/HiddenResourceCard";
import DevelopmentCard from "../cards/DevelopmentCard";

const PlayerDisplay = ({ player, ...props }) => {
  const { hand, isActive, isThisPlayer } = player;
  const numDevelopmentCards = getCardCountForHand(hand.developmentCards);
  const numResourceCards = getCardCountForHand(hand.resourceCards);
  const numPlayedDevelopmentCards = getCardCountForHand(
    hand.playedDevelopmentCards
  );

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
            size={isThisPlayer ? "large" : "medium"}
            weight={isThisPlayer ? "bold" : "normal"}
            truncate
          >
            {player.displayName}
          </Text>
          {isThisPlayer && <Fireball size="medium" color="dark-1" />}
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
          {numPlayedDevelopmentCards > 0 && (
            <DevelopmentCard
              width="33px"
              height="50px"
              count={numPlayedDevelopmentCards}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerDisplay;
