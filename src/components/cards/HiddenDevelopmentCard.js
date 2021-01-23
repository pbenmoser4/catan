import React from "react";

import { developmentCardColor } from "../../util/constants";

import Card from "./Card";

const HiddenDevelopmentCard = ({ width, height, count, text, ...props }) => {
  return (
    <Card
      background={developmentCardColor}
      count={count}
      text={text ? text : ""}
      width={width}
      height={height}
    />
  );
};

export default HiddenDevelopmentCard;
