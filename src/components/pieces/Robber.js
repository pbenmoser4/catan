import React from "react";

const Robber = ({ center, height, ...props }) => {
  const { x, y } = center;

  const base = height / 10;
  return (
    <g>
      <rect
        x={`${x - 2.5 * base}`}
        y={`${y + 4 * base}`}
        width={`${5 * base}`}
        height={`${base}`}
        fill="black"
      />
      <ellipse
        cx={`${x}`}
        cy={`${y + 1.25 * base}`}
        rx={`${2.5 * base}`}
        ry={`${3.75 * base}`}
        fill="black"
      />
      <circle
        cx={`${x}`}
        cy={`${y - 3.5 * base}`}
        r={`${1.5 * base}`}
        fill="black"
      />
    </g>
  );
};

export default Robber;
