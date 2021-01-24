import React from "react";

import { developmentCardColor } from "../../util/constants";

import Card from "./Card";

const DevelopmentCard = ({ width, height, count, show, text, ...props }) => {
  return (
    <Card
      background={developmentCardColor}
      count={count ? count : ""}
      text={text ? text : ""}
      width={width}
      height={height}
      show={show}
    />
  );
};

export default DevelopmentCard;
