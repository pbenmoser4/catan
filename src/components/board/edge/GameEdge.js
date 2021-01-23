import React, { useState } from "react";
import { connect } from "react-redux";

import {
  getNodeIndicesForEdgeIndex,
  getCenterForIndex,
} from "../../../util/helpers";
import { TILE_CLICK } from "../../../util/constants";

import Road from "../../pieces/Road";

const renderRoad = (edge, startCoords, endCoords) => {
  const { road } = edge;
  if (road) {
    return (
      <Road
        startCoords={startCoords}
        endCoords={endCoords}
        color={road.color}
      />
    );
  } else {
    return null;
  }
};

const GameEdge = (props) => {
  const { edge, nodes, startCoords, endCoords, strokeWidth, onClick } = props;
  const [hover, setHover] = useState(false);
  const x1 = `${startCoords.x}`;
  const y1 = `${startCoords.y}`;
  const x2 = `${endCoords.x}`;
  const y2 = `${endCoords.y}`;

  return (
    <g
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(edge)}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth={strokeWidth * 5}
        strokeOpacity={hover ? 1.0 : 0.0}
      />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth={strokeWidth}
      />
      {renderRoad(edge, startCoords, endCoords)}
    </g>
  );
};

const mapStateToProps = (state, ownProps) => {
  let nodes = getNodeIndicesForEdgeIndex(ownProps.edge);
  let startNode = nodes[0];
  let endNode = nodes[1];
  let startCoords = getCenterForIndex(startNode, state.dimensions.coords.NODE);
  let endCoords = getCenterForIndex(endNode, state.dimensions.coords.NODE);

  return {
    nodes: getNodeIndicesForEdgeIndex(ownProps.edge),
    startCoords: startCoords,
    endCoords: endCoords,
    strokeWidth: state.dimensions.tilePad,
  };
};

export default connect(mapStateToProps, {})(GameEdge);
