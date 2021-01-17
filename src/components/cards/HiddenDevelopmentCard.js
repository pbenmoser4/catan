import React from "react";

import { developmentCardColor } from "../../util/constants";

import Card from "./Card";

const HiddenDevelopmentCard = ({ width, height, count, ...props }) => {
  return (
    <Card
      background={developmentCardColor}
      count={count}
      width={width}
      height={height}
    />
  );
};

export default HiddenDevelopmentCard;
