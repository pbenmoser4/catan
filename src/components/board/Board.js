import React, { useEffect } from "react";
import { connect } from "react-redux";

import { generateBoardState, setBoardDimensions } from "../../actions";

import { Group } from "@visx/group";

import GameTile from "./tile/GameTile";
import GameNode from "./node/GameNode";
import GameEdge from "./edge/GameEdge";

const Board = ({
  pad = 0,
  tilePadRatio = 0.03, // tilePadRatio is the ratio to the sidelength
  containerBox,
  onEdgeClick,
  onNodeClick,
  onTileClick,
  ...props
}) => {
  const { generateBoardState, setBoardDimensions, numCols } = props;
  useEffect(() => {
    if (Object.keys(board).length === 0) {
      generateBoardState(numCols);
    }
    setBoardDimensions(containerBox, numCols, tilePadRatio, pad);
  }, [
    generateBoardState,
    setBoardDimensions,
    numCols,
    containerBox,
    tilePadRatio,
    pad,
    board,
  ]);

  let { board, dimensions } = props;

  let boardTiles = [];
  let boardNodes = [];
  let boardEdges = [];

  if (
    Object.keys(dimensions).length > 0 &&
    Object.keys(board).length > 0 &&
    boardTiles.length === 0 &&
    boardNodes.length === 0
  ) {
    const { tiles, oceanTiles, nodes, edges } = board;

    tiles.forEach((tile, i) => {
      boardTiles.push(<GameTile tile={tile} key={i} onClick={onTileClick} />);
    });

    oceanTiles.forEach((tile, i) => {
      boardTiles.push(
        <GameTile tile={tile} key={i + 100} onClick={onTileClick} />
      );
    });

    nodes.forEach((node, i) => {
      boardNodes.push(
        <GameNode node={node} key={i + 200} onClick={onNodeClick} />
      );
    });

    edges.forEach((edge, i) => {
      boardEdges.push(
        <GameEdge edge={edge} key={i + 1000} onClick={onEdgeClick} />
      );
    });

    return (
      <Group>
        <Group>{boardTiles}</Group>
        <Group>{boardEdges}</Group>
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
