import React from "react";

import { Box } from "grommet";

import PlayerDisplay from "./PlayerDisplay";

const Players = ({ players, activePlayerId, thisPlayerId, ...props }) => {
  return (
    <Box direction="column" gap="medium">
      {players &&
        players.map((player, i) => {
          const { id } = player;
          const isThisPlayer = id === thisPlayerId ? true : false;
          return (
            <PlayerDisplay player={player} key={i} thisPlayer={isThisPlayer} />
          );
        })}
    </Box>
  );
};

export default Players;
