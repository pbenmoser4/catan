import React from "react";
import { Box, Button, Text } from "grommet";

const ActionsPane = (props) => {
  return (
    <Box direction="column" gap="small" align="center">
      <Text>Actions</Text>
      <Button label="Roll" onClick={() => console.log("Roll!")} />
      <Button label="Build" />
      <Button label="Buy" />
      <Button label="Trade" />
    </Box>
  );
};

export default ActionsPane;
