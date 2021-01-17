import React from "react";

import { resourceCardColor } from "../../util/constants";

import Card from "./Card";

const HiddenResourceCard = ({ width, height, count, ...props }) => {
  return (
    <Card
      background={resourceCardColor}
      count={count}
      width={width}
      height={height}
    />
  );
};

export default HiddenResourceCard;
