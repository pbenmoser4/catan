import React from "react";

import { resourceCardColor, tileColors } from "../../util/constants";

import Card from "./Card";

const ResourceCard = ({
  width,
  height,
  count,
  resource,
  show,
  text,
  ...props
}) => {
  return (
    <Card
      background={tileColors[resource]}
      count={count >= 0 ? count : ""}
      text={text ? text : ""}
      width={width}
      height={height}
      show={show}
    />
  );
};

export default ResourceCard;
