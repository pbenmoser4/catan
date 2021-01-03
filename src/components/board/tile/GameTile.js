import React from "react";
import { connect } from "react-redux";

import { getCenterForIndex } from "../../../util/helpers";
import { tileColors, DESERT, RESOURCE, WATER } from "../../../util/constants";

import { Group } from "@visx/group";

import Hexagon from "./Hexagon";
import Pip from "./Pip";

const GameTile = (props) => {
  const { width, height, center, pad, tile, pip } = props;
  const color = tileColors[tile[RESOURCE]];
  console.log(pip);
  if (tile[RESOURCE] !== WATER && tile[RESOURCE] !== DESERT) {
    console.log(tile);
  }

  return (
    <Group>
      <Hexagon
        width={width}
        center={center}
        pad={pad}
        background={color}
        onClick={() => console.log(tile)}
      />
      {tile[RESOURCE] !== WATER && tile[RESOURCE] !== DESERT && pip && (
        <Pip center={center} containerWidth={width} number={pip.number} />
      )}
    </Group>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { tile } = ownProps;
  return {
    width: state.dimensions.componentWidth,
    height: state.dimensions.componentHeight,
    center: getCenterForIndex(ownProps.tile, state.dimensions.coords.TILE),
    pad: state.dimensions.tilePad,
  };
};

export default connect(mapStateToProps, {})(GameTile);
