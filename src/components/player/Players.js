import React from "react";

import { Box } from "grommet";

import PlayerDisplay from "./PlayerDisplay";

const Players = ({ players, activePlayerId, ...props }) => {
  return (
    <Box direction="column" gap="medium">
      {players &&
        players.map((player, i) => {
          const { id } = player;
          let isActivePlayer = id === activePlayerId ? true : false;
          return (
            <PlayerDisplay player={player} key={i} active={isActivePlayer} />
          );
        })}
    </Box>
  );
};

export default Players;
