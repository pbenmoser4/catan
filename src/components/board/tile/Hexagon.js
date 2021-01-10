import React, { useState } from "react";
import { Polygon } from "@visx/shape";

const Hexagon = ({ width, center, pad, background, onClick, ...props }) => {
  const rotate = 0;

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

  return (
    <svg width={width} height={height} x={x} y={y} onClick={onClick}>
      <Polygon
        sides={6}
        size={shapeSide}
        fill={background}
        rotate={rotate}
        center={shapeCenter}
      />
    </svg>
  );
};

export default Hexagon;
