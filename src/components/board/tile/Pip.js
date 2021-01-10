import React from "react";

import { pipColor, pipBorder } from "../../../util/constants";
import { pipsForPipNumber } from "../../../util/helpers";

import { Group } from "@visx/group";

const Pip = ({ center, number, containerWidth, radius, ...props }) => {
  // const r = containerWidth / 6;
  const r = radius;
  const fillColor = [8, 6].includes(parseInt(number)) ? "red" : "black";
  return (
    <Group>
      <circle
        cx={`${center.x}`}
        cy={`${center.y}`}
        r={r}
        fill={pipColor}
        stroke={`${pipBorder}`}
        strokeWidth={r / 10}
      />
      <text
        x={`${center.x}`}
        y={`${center.y}`}
        fontSize={r}
        dominantBaseline="middle"
        textAnchor="middle"
        fill={fillColor}
      >
        {`${number}`}
      </text>
      <text
        x={`${center.x}`}
        y={`${center.y + r / 1.75}`}
        fontSize={r / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        fill={fillColor}
      >
        {pipsForPipNumber(number)}
      </text>
    </Group>
  );
};

export default Pip;
