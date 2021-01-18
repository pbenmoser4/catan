import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { getAppDimensionsForWindowBox } from "../../util/helpers";
import { placeSettlement, placeCity, placeRoad } from "../../actions";

import Board from "./Board";

const GameBoard = ({ width, height, svgDims, background, ...props }) => {
  const { placeSettlement, placeCity, placeRoad } = props;
  // Click func tions for the board
  const onNodeClick = (node) => {
    placeCity(node);
  };

  const onEdgeClick = (edge, player) => {
    placeRoad(edge);
  };

  const onTileClick = (tile, player) => {
    console.log(tile);
  };

  const viewBoxString = svgDims.map((_) => String(_)).join(" ");
  let dims = getAppDimensionsForWindowBox(width, height);
  let boardPad = 1;
  return (
    <svg viewBox={viewBoxString} width={width} height={height}>
      <rect
        width="100%"
        height="100%"
        fill={background ? background : "white"}
        fillOpacity={background ? 1.0 : 0.0}
      />
      <Board
        pad={boardPad}
        numCols={7}
        containerBox={{
          x: svgDims[0],
          y: svgDims[1],
          width: svgDims[2] - 2 * boardPad,
          height: svgDims[3] - 2 * boardPad,
        }}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onTileClick={onTileClick}
      />
    </svg>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    players: state.players.players,
    thisPlayer: _.find(state.players.players, (p) => p.isThisPlayer),
  };
};

export default connect(mapStateToProps, {
  placeSettlement,
  placeCity,
  placeRoad,
})(GameBoard);
