import React from "react";

import { Box, Text } from "grommet";

const Card = ({ width, height, background, count, text, show }) => {
  return (
    <Box
      background={show ? "light-1" : background}
      height={height}
      width={width}
      align="center"
      justify="center"
      border={
        show
          ? { color: background, size: "8px" }
          : { color: "black", size: "small" }
      }
      round="xsmall"
    >
      <Box direction="column" align="center" justify="center">
        <Text size="xsmall">{`${text}`}</Text>
        <Text>{`${count}`}</Text>
      </Box>
    </Box>
  );
};

export default Card;
