import React from "react";

import { resourceCardColor } from "../../util/constants";

import Card from "./Card";

const HiddenResourceCard = ({ width, height, count, text, ...props }) => {
  return (
    <Card
      background={resourceCardColor}
      count={count}
      text={text ? text : ""}
      width={width}
      height={height}
    />
  );
};

export default HiddenResourceCard;
