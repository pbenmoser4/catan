import React from "react";

import { Box, Text } from "grommet";

const Card = ({ width, height, background, count }) => {
  return (
    <Box
      background={background}
      height={height}
      width={width}
      align="center"
      justify="center"
      border={{ color: "black", size: "xsmall" }}
      round="xsmall"
    >
      <Text>{`${count}`}</Text>
    </Box>
  );
};

export default Card;
