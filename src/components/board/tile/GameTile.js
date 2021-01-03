import React from "react";
import { connect } from "react-redux";

import { getCenterForIndex } from "../../../util/helpers";
import {
  tileColors,
  DESERT,
  RESOURCE,
  WATER,
  TILE_CLICK,
} from "../../../util/constants";

import { Group } from "@visx/group";

import Hexagon from "./Hexagon";
import Pip from "./Pip";

const GameTile = (props) => {
  const { width, height, center, pad, tile, pip, onClick } = props;
  const color = tileColors[tile[RESOURCE]];

  return (
    <Group>
      <Hexagon
        width={width}
        center={center}
        pad={pad}
        background={color}
        onClick={() => onClick(tile)}
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
    onClick: state.actions[TILE_CLICK],
  };
};

export default connect(mapStateToProps, {})(GameTile);
