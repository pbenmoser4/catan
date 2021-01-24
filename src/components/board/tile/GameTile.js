import React, { useState } from "react";
import { connect } from "react-redux";

import { getCenterForIndex } from "../../../util/helpers";
import {
  tileColors,
  DESERT,
  RESOURCE,
  WATER,
  TILE_CLICK,
  PORT_DIRECTION,
  PORT_RESOURCE,
  ROBBER,
} from "../../../util/constants";

import { Group } from "@visx/group";

import Hexagon from "./Hexagon";
import Pip from "./Pip";
import Port from "./Port";
import Robber from "../../pieces/Robber";

const GameTile = (props) => {
  const [hover, setHover] = useState(false);
  const { width, height, center, pad, tile, onClick } = props;
  const color = tileColors[tile[RESOURCE]];

  return (
    <Group
      onClick={() => onClick({ tile: tile })}
      opacity={hover ? 0.8 : 1.0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Hexagon width={width} center={center} pad={pad} background={color} />
      {tile[RESOURCE] !== WATER &&
        tile[RESOURCE] !== DESERT &&
        tile["number"] && (
          <Pip
            center={center}
            containerWidth={width}
            number={tile.number}
            radius={hover ? width / 5 : width / 6}
          />
        )}
      {tile[RESOURCE] === WATER && tile[PORT_RESOURCE] && (
        <Port
          resource={tile[PORT_RESOURCE]}
          direction={tile[PORT_DIRECTION]}
          center={center}
          width={width}
          pad={pad}
          hover={hover ? true : false}
        />
      )}
      {tile[ROBBER] && (
        <Robber center={center} height={hover ? width / 2.5 : width / 3} />
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
