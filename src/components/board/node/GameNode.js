import React, { useState } from "react";
import { connect } from "react-redux";

import { getCenterForIndex } from "../../../util/helpers";
import {
  getTilesForNode,
  getResourceTilesForNode,
  getPortsForNode,
} from "../../../actions";

import Settlement from "../../pieces/Settlement";
import City from "../../pieces/City";

const renderSettlement = (node, containerWidth) => {
  const { settlement } = node;
  if (settlement) {
    return (
      <Settlement containerWidth={containerWidth} color={settlement.color} />
    );
  } else {
    return null;
  }
};

const renderCity = (node, containerWidth) => {
  const { city } = node;
  if (city) {
    return <City containerWidth={containerWidth} color={city.color} />;
  } else {
    return null;
  }
};

const GameNode = (props) => {
  const { node, center, radius, onClick } = props;
  const [hover, setHover] = useState(false);
  return (
    <svg
      width={2 * radius}
      height={2 * radius}
      x={center.x - radius}
      y={center.y - radius}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(node)}
    >
      <circle
        cx={`${radius}`}
        cy={`${radius}`}
        r={radius}
        fill="black"
        fillOpacity={hover ? 1.0 : 0.0}
      />
      {renderSettlement(node, 2 * radius)}
      {renderCity(node, 2 * radius)}
    </svg>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    radius: state.dimensions.componentWidth / 10,
    center: getCenterForIndex(ownProps.node, state.dimensions.coords.NODE),
  };
};

export default connect(mapStateToProps, {
  getTilesForNode,
  getResourceTilesForNode,
  getPortsForNode,
})(GameNode);
