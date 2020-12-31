import React, { useState } from "react";
import { Polygon } from "@visx/shape";

const Hexagon = ({
  width,
  center,
  pad,
  background = "rgb(100,100,100)",
  fill = undefined,
  ...props
}) => {
  const [hover, setHover] = useState(false);

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

export default Hexagon;
