import React, { useState } from "react";
import { connect } from "react-redux";

import {
  getCenterForIndex,
  getEdgeIndicesForNodeIndex,
  getTileIndicesForNodeIndex,
} from "../../../util/helpers";
import {
  getTilesForNode,
  getResourceTilesForNode,
  getPortsForNode,
} from "../../../actions";

import { NODE_CLICK } from "../../../util/constants";

//// TODO: implement rendering of settlements and cities
// const renderSettlement = (node) => {
//   return null;
// };
//
// const renderCity = (node) => {
//   return null;
// };

const GameNode = (props) => {
  const {
    node,
    center,
    radius,
    onClick,
    getTilesForNode,
    getResourceTilesForNode,
    getPortsForNode,
  } = props;
  const tiles = getTilesForNode(node);
  const resources = getResourceTilesForNode(node);
  const ports = getPortsForNode(node);
  // console.log(tiles);
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
      onClick={() =>
        onClick({
          node: node,
          edges: getEdgeIndicesForNodeIndex(node),
          tiles: tiles,
          resources: resources,
          ports: ports,
        })
      }
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
    onClick: state.actions[NODE_CLICK],
  };
};

export default connect(mapStateToProps, {
  getTilesForNode,
  getResourceTilesForNode,
  getPortsForNode,
})(GameNode);
