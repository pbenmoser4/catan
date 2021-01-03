import React, { useState } from "react";
import { connect } from "react-redux";

import { getCenterForIndex } from "../../../util/helpers";

import { Group } from "@visx/group";

const renderSettlement = (node) => {
  return null;
};

const renderCity = (node) => {
  return null;
};

//// TODO: set node click function as a state variable
const GameNode = (props) => {
  const { node, center, radius, onClick } = props;
  const [hover, setHover] = useState(false);
  // console.log(node, center, radius);
  return (
    <svg
      width={2 * radius}
      height={2 * radius}
      x={center.x - radius}
      y={center.y - radius}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <circle
        cx={`${radius}`}
        cy={`${radius}`}
        r={radius}
        fill="black"
        fillOpacity={hover ? 1.0 : 0.0}
      />
    </svg>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    radius: state.dimensions.componentWidth / 10,
    center: getCenterForIndex(ownProps.node, state.dimensions.coords.NODE),
  };
};

export default connect(mapStateToProps, {})(GameNode);
