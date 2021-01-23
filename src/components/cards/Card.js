import React from "react";

import { Box, Text } from "grommet";

const Card = ({ width, height, background, count, show }) => {
  return (
    <Box
      background={show ? "light-1" : background}
      height={height}
      width={width}
      align="center"
      justify="center"
      border={
        show
          ? { color: background, size: "medium" }
          : { color: "black", size: "small" }
      }
      round="xsmall"
    >
      <Text>{`${count}`}</Text>
    </Box>
  );
};

export default Card;
