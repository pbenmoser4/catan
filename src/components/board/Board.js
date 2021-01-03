import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { generateBoardState, setBoardDimensions } from "../../actions";
import { buildRowIndices } from "../../util/helpers";

import { Group } from "@visx/group";

import Hexagon from "./tile/Hexagon";
import GameTile from "./tile/GameTile";
import GameNode from "./node/GameNode";

const Board = ({
  pad = 0,
  tilePadRatio = 0.03, // tilePadRatio is the ratio to the sidelength
  containerBox,
  ...props
}) => {
  const { generateBoardState, setBoardDimensions, numCols } = props;
  useEffect(() => {
    generateBoardState(numCols);
    setBoardDimensions(containerBox, numCols, tilePadRatio, pad);
  }, [
    generateBoardState,
    setBoardDimensions,
    numCols,
    containerBox,
    tilePadRatio,
    pad,
  ]);

  let { board, dimensions } = props;

  let middle = parseInt(Math.floor(numCols / 2));
  let boardTiles = [];
  let boardNodes = [];

  if (
    Object.keys(dimensions).length > 0 &&
    Object.keys(board).length > 0 &&
    boardTiles.length === 0 &&
    boardNodes.length === 0
  ) {
    const { tiles, oceanTiles, pips, nodes } = board;

    tiles.forEach((tile, i) => {
      let { row, col } = tile;
      let pip = _.find(pips, (p) => p.row === row && p.col === col);
      boardTiles.push(<GameTile tile={tile} key={i} pip={pip} />);
    });

    oceanTiles.forEach((tile, i) => {
      boardTiles.push(<GameTile tile={tile} key={i + 100} />);
    });

    nodes.forEach((node, i) => {
      boardNodes.push(<GameNode node={node} key={i + 200} />);
    });

    return (
      <Group>
        <Group>{boardTiles}</Group>
        <Group>{boardNodes}</Group>
      </Group>
    );
  } else {
    return <div>nada</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    board: state.board,
    dimensions: state.dimensions,
  };
};

export default connect(mapStateToProps, {
  generateBoardState,
  setBoardDimensions,
})(Board);
