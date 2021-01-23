import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";

import { Box, Grid, Stack, Text } from "grommet";

import {
  BRICK,
  ORE,
  SHEEP,
  WHEAT,
  WOOD,
  developmentCardLabels,
  resourceLabels,
} from "../../util/constants";

import ResourceDisplayItem from "./ResourceDisplayItem";
import DevelopmentCardDisplayItem from "./DevelopmentCardDisplayItem";

const generateHandResourceItems = (hand) => {
  const { resources } = hand;

  const items = _.map(resources, (count, resource, i) => {
    return (
      <ResourceDisplayItem
        gridArea={resource}
        key={resource}
        resource={resource}
        count={count}
        label={resourceLabels[resource]}
      />
    );
  });

  return items;
};

const generateUnplayedHandDevelopmentCards = (hand, componentWidth) => {
  const { developmentCards } = hand;
  let items = [];

  _.forEach(developmentCards, (count, cardType, i) => {
    if (count > 0) {
      items.push(
        <DevelopmentCardDisplayItem
          key={`${cardType}shown`}
          cardType={cardType}
          count={count}
          label={developmentCardLabels[cardType]}
        />
      );
    }
  });

  return items;
};

const generatePlayedHandDevelopmentCards = (hand, componentWidth) => {
  const { playedDevelopmentCards } = hand;
  let items = [];

  _.forEach(playedDevelopmentCards, (count, cardType, i) => {
    if (count > 0) {
      items.push(
        <DevelopmentCardDisplayItem
          key={`${cardType}shown`}
          cardType={cardType}
          played
        />
      );
    }
  });

  return items;
};

const Hand = ({ hand, ...props }) => {
  const [componentWidth, setComponentWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setComponentWidth(ref.current.offsetWidth);
    }
  }, [setComponentWidth]);

  const resourceItems = generateHandResourceItems(hand);
  const developmentCardItems = generateUnplayedHandDevelopmentCards(
    hand,
    componentWidth
  );
  const playedDevelopmentCardItems = generatePlayedHandDevelopmentCards(
    hand,
    componentWidth
  );
  console.log(developmentCardItems, playedDevelopmentCardItems);

  return (
    <Box direction="column" gap="small" ref={ref}>
      <Box direction="column" gap="small">
        <Text size="large" weight="bold">
          Resource Cards
        </Text>
        <Grid
          background="light-1"
          rows={["auto", "auto"]}
          columns={["auto", "auto", "auto"]}
          areas={[
            { name: BRICK, start: [0, 0], end: [0, 0] },
            { name: ORE, start: [1, 0], end: [1, 0] },
            { name: SHEEP, start: [2, 0], end: [2, 0] },
            { name: WHEAT, start: [0, 1], end: [0, 1] },
            { name: WOOD, start: [1, 1], end: [1, 1] },
          ]}
        >
          {resourceItems}
        </Grid>
      </Box>
      {developmentCardItems.length > 0 && (
        <Box direction="column" gap="small">
          <Text size="large" weight="bold">
            Development Cards
          </Text>
          <Box direction="row">{developmentCardItems}</Box>
        </Box>
      )}
      {playedDevelopmentCardItems.length > 0 && (
        <Box direction="column" gap="small">
          <Text size="large" weight="bold">
            Played D-Cards
          </Text>
          <Box direction="row">{playedDevelopmentCardItems}</Box>
        </Box>
      )}
    </Box>
  );
};

export default Hand;
