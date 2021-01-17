import React from "react";

import { developmentCardColor } from "../../util/constants";

import Card from "./Card";

const DevelopmentCard = ({ width, height, count, ...props }) => {
  return (
    <Card
      background={developmentCardColor}
      count={count}
      width={width}
      height={height}
      show
    />
  );
};

export default DevelopmentCard;
