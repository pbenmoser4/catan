import React from "react";

import { Box } from "grommet";

import PlayerDisplay from "./PlayerDisplay";

const Players = ({ players, ...props }) => {
  return (
    <Box direction="column" gap="small">
      {players &&
        players.map((player, i) => {
          return <PlayerDisplay player={player} key={i} />;
        })}
    </Box>
  );
};

export default Players;
