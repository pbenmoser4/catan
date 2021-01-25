import React, { useState } from "react";
import { connect } from "react-redux";

import { Avatar, Box, Text } from "grommet";
import { Fireball, Sun } from "grommet-icons";

import { getCardCountForHand } from "../../util/helpers";
import { setThisPlayer } from "../../actions/player";

import DevelopmentCard from "../cards/DevelopmentCard";
import HiddenDevelopmentCard from "../cards/HiddenDevelopmentCard";
import HiddenResourceCard from "../cards/HiddenResourceCard";

const PlayerDisplay = ({ player, devMode, setThisPlayer, ...props }) => {
  const [hover, setHover] = useState(false);
  const { hand, isActive, isThisPlayer } = player;
  const numDevelopmentCards = getCardCountForHand(hand.developmentCards);
  const numResourceCards = getCardCountForHand(hand.resources);
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
      round="small"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (devMode) {
          setThisPlayer(player.id);
        }
      }}
    >
      {isActive && <Sun size="medium" />}
      <Avatar
        size="medium"
        background={player.color}
        border={
          isActive
            ? { color: "dark-2", size: "medium" }
            : { color: "dark-2", size: "small" }
        }
      >
        {player.icon}
      </Avatar>
      <Box direction="column" align="start" gap="small">
        <Box direction="row" gap="small" align="center">
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
            text="R"
            count={numResourceCards}
          />
          <HiddenDevelopmentCard
            width="33px"
            height="50px"
            text="D"
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

const mapStateToProps = (state) => {
  return {
    devMode: state.gameState.devMode,
  };
};

export default connect(mapStateToProps, { setThisPlayer })(PlayerDisplay);
