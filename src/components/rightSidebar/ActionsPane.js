import React from "react";
import { connect } from "react-redux";

import { Box, Button, Text } from "grommet";

import { startRoll } from "../../actions";

const ActionsPane = (props) => {
  const { startRoll } = props;
  return (
    <Box direction="column" gap="small" align="center">
      <Text>Actions</Text>
      <Button label="Roll" onClick={() => startRoll()} />
      <Button label="Build" />
      <Button label="Buy" />
      <Button label="Trade" />
    </Box>
  );
};

export default connect(null, { startRoll })(ActionsPane);
