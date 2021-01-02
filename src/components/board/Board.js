import React, { useEffect } from "react";
import { connect } from "react-redux";

import { generateBoardState } from "../../actions";
import { buildRowIndices, getBoardLayout } from "../../util/helpers";

import { Group } from "@visx/group";

import Hexagon from "./tile/Hexagon";

const Board = ({
  pad = 0,
  tilePadRatio = 0.01, // tilePadRatio is the ratio to the sidelength
  containerBox,
  ...props
}) => {
  const { generateBoardState, numCols } = props;
  useEffect(() => {
    generateBoardState(numCols);
  }, [generateBoardState, numCols]);

  let { board } = props;

  const layout = getBoardLayout(containerBox, numCols, tilePadRatio, pad);
  console.log(layout);

  let middle = parseInt(Math.floor(numCols / 2));
  let boardTiles = [];

  if (layout && Object.keys(board).length > 0) {
    const { tiles, oceanTiles } = board;
    tiles.forEach((tile, i) => {
      const { row, col } = tile;
      const x = layout.coords.TILE.xs[col];
      const y = layout.coords.TILE.ys[row];
      boardTiles.push(
        <Hexagon
          key={i}
          tile={tile}
          width={layout.componentWidth}
          center={{ x: x, y: y }}
          pad={layout.tilePad}
        />
      );
    });

    oceanTiles.forEach((tile, i) => {
      const { row, col } = tile;
      const x = layout.coords.TILE.xs[col];
      const y = layout.coords.TILE.ys[row];
      boardTiles.push(
        <Hexagon
          key={i + 100}
          tile={tile}
          width={layout.componentWidth}
          center={{ x: x, y: y }}
          pad={layout.tilePad}
        />
      );
    });

    return <Group>{boardTiles}</Group>;
  } else {
    return <div>nada</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    board: state.board,
  };
};

export default connect(mapStateToProps, { generateBoardState })(Board);
