import React from "react";

import { Box, Text } from "grommet";

import ResourceCard from "../cards/ResourceCard";

const ResourceDisplayItem = ({ resource, count, label, ...props }) => {
  return (
    <Box
      direction="column"
      gap="xsmall"
      pad="xsmall"
      align="center"
      justify="center"
    >
      <ResourceCard
        width="50px"
        height="70px"
        resource={resource}
        count={count}
        show={false}
      />
      <Text>{label}</Text>
    </Box>
  );
};

export default ResourceDisplayItem;
