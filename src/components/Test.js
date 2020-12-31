import React, { useState } from "react";
import { Polygon } from "@visx/shape";
import { Group } from "@visx/group";

const RegularHexagon = ({
  width,
  center,
  pad,
  background = "rgb(100,100,100)",
  rotate = 0,
  fill = undefined,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  if (!pad) {
    pad = width * 0.03;
  }

  const shapeWidth = width - Math.sqrt(3) * pad;
  const shapeSide = shapeWidth / 2;
  const shapeHeight = Math.sqrt(3) * shapeSide;
  const height = shapeHeight + 2 * pad;

  let shapeCenter = { x: width / 2, y: height / 2 };

  let x = 0;
  let y = 0;

  if (!!center) {
    x = center.x - shapeSide - (Math.sqrt(3) / 2) * pad;
    y = center.y - (Math.sqrt(3) / 2) * shapeSide - pad;
  }

  if (!rotate) {
    rotate = 0;
  }

  return (
    <svg
      width={width}
      height={height}
      x={x}
      y={y}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <rect
        width={width}
        height={height}
        fill={fill}
        fillOpacity={fill ? 1.0 : 0.0}
      />
      <Polygon
        sides={6}
        size={shapeSide}
        fill={hover ? `rgb(200,200,200)` : background}
        rotate={rotate}
        center={shapeCenter}
      />
    </svg>
  );
};

const SvgTest = (props) => {
  const svgDims = [0, 0, 100, 150];
  const viewBoxString = svgDims.map((_) => String(_)).join(" ");
  console.log(viewBoxString);
  return (
    <svg viewBox={viewBoxString} width="100%" height="100%" id="svg-container">
      <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      <Board
        width={100}
        pad={1}
        numCols={7}
        containerBox={{
          x: svgDims[0],
          y: svgDims[1],
          width: svgDims[2],
          height: svgDims[3],
        }}
      />
    </svg>
  );
};

const buildRowIndices = (rowsInColumn, maxRows) => {
  let startIndex = maxRows - rowsInColumn;
  let indices = [];
  for (let i = 0; i < rowsInColumn; ++i) {
    indices.push(startIndex + 2 * i);
  }
  return indices;
};

const Board = ({
  width,
  pad = 0,
  tilePadRatio = 0.01, // tilePadRatio is the ratio to the sidelength
  numCols = 7,
  containerBox,
  ...props
}) => {
  const containerWidth = containerBox.width;
  const containerHeight = containerBox.height;
  const containerHWRatio = containerHeight / containerWidth;

  const boardCenter = { x: containerWidth / 2, y: containerHeight / 2 };
  const boardHWRatio =
    (2 * (numCols * Math.sqrt(3) + numCols * tilePadRatio - tilePadRatio)) /
    (3 * numCols +
      Math.sqrt(3) * tilePadRatio * numCols -
      Math.sqrt(3) * tilePadRatio +
      1);

  let basis = containerHWRatio < boardHWRatio ? "height" : "width";
  console.log(basis);

  let boardWidth =
    basis === "width"
      ? containerWidth - 2 * pad
      : containerHeight / boardHWRatio - 2 * pad;

  const numRows = numCols * 2 - 1;
  const boardHeight = boardWidth * boardHWRatio;

  const tileSide =
    boardHeight /
    (numCols * Math.sqrt(3) + tilePadRatio * numCols - tilePadRatio);

  let tilePad = tileSide * tilePadRatio;
  const tileWidth = 2 * tileSide;
  const componentWidth = tileWidth + Math.sqrt(3) * tilePad;

  let xs = [];
  let padX = basis === "width" ? pad : 0;
  let minX =
    basis === "width"
      ? boardCenter.x - containerWidth / 2
      : boardCenter.x - boardWidth / 2;
  for (let i = 0; i < numCols; ++i) {
    let x =
      minX +
      padX +
      tileSide +
      i * ((3 * tileSide + Math.sqrt(3) * tilePad) / 2);
    xs.push(x);
  }

  let ys = [];
  let padY = basis === "height" ? pad : 0;
  let minY =
    basis === "height"
      ? boardCenter.y - containerHeight / 2
      : boardCenter.y - boardHeight / 2;
  console.log(minY);
  for (let i = 0; i < numRows; ++i) {
    let y =
      minY +
      padY +
      (Math.sqrt(3) / 2) * tileSide +
      i * ((Math.sqrt(3) * tileSide + tilePad) / 2);
    ys.push(y);
  }

  let middle = parseInt(Math.floor(numCols / 2));
  let tiles = [];

  for (let i = 0; i < numCols; ++i) {
    let offset = Math.ceil(i / 2);
    let directedOffset = Math.pow(-1, i) * offset;
    let columnX = xs[middle + directedOffset];
    let rowsInColumn = numCols - offset;
    let rowIndices = buildRowIndices(rowsInColumn, numCols);
    rowIndices.forEach((rowIndex) => {
      let rowY = ys[rowIndex];
      tiles.push(
        <RegularHexagon
          key={`${i}-${rowIndex}`}
          width={componentWidth}
          center={{ x: columnX, y: rowY }}
          pad={tilePad}
        />
      );
    });
  }

  return <Group>{tiles}</Group>;
};

const Test = (props) => {
  return (
    <div>
      <SvgTest />
    </div>
  );
};

export default Test;
