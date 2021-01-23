import React from "react";

import { Box, Text } from "grommet";

import DevelopmentCard from "../cards/DevelopmentCard";

const generateDisplayLabel = (label) => {
  const stringArray = label.split(" ");
  return stringArray.map((s) => s.charAt(0)).join("");
};

const DevelopmentCardDisplayItem = ({ cardType, count, label, ...props }) => {
  return (
    <Box
      direction="column"
      gap="xsmall"
      pad="xsmall"
      align="center"
      justify="center"
    >
      <DevelopmentCard
        width="50px"
        height="70px"
        count={count}
        show={false}
        text={generateDisplayLabel(label)}
      />
    </Box>
  );
};

export default DevelopmentCardDisplayItem;
