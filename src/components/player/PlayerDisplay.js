import React from "react";
import { connect } from "react-redux";

import { Avatar, Box, Text } from "grommet";

import HiddenDevelopmentCard from "../cards/HiddenDevelopmentCard";

const PlayerDisplay = ({ player, ...props }) => {
  console.log(player);
  return (
    <Box direction="column" gap="small">
      <Box direction="row" gap="xsmall" align="center">
        <Avatar size="medium" background={player.color}>
          {player.icon}
        </Avatar>
        <Text>{player.displayName}</Text>
      </Box>
      <Box direction="row">
        <HiddenDevelopmentCard width="33px" height="50px" count={3} />
      </Box>
    </Box>
  );
};

export default PlayerDisplay;
