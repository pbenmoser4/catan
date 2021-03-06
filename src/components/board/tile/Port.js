import React from "react";

import { tileColors } from "../../../util/constants";

import { Group } from "@visx/group";

const Port = ({ resource, direction, center, width, pad, hover, ...props }) => {
  const strokeWidth = hover ? 3 : 2;
  const innerStrokeWidth = strokeWidth - 2 * pad;
  const s = (width - 2 * pad) / 2 - strokeWidth / 2;
  const points = [center];
  let theta1 = undefined;
  let theta2 = undefined;
  switch (direction) {
    case "dd":
      theta1 = (4 * Math.PI) / 3;
      theta2 = (5 * Math.PI) / 3;
      break;
    case "dl":
      theta1 = Math.PI;
      theta2 = (4 * Math.PI) / 3;
      break;
    case "dr":
      theta1 = (5 * Math.PI) / 3;
      theta2 = 0;
      break;
    case "uu":
      theta1 = Math.PI / 3;
      theta2 = (2 * Math.PI) / 3;
      break;
    case "ul":
      theta1 = (2 * Math.PI) / 3;
      theta2 = Math.PI;
      break;
    case "ur":
      theta1 = 0;
      theta2 = Math.PI / 3;
      break;
    default:
      return <Group></Group>;
  }

  points.push({
    x: center.x + Math.cos(theta1) * s,
    y: center.y - Math.sin(theta1) * s,
  });
  points.push({
    x: center.x + Math.cos(theta2) * s,
    y: center.y - Math.sin(theta2) * s,
  });
  // console.log(points.map((point) => `${point.x}, ${point.y}`));
  const path = points.map((point) => `${point.x}, ${point.y}`).join(" ");
  const color = tileColors[resource];

  return (
    <Group>
      <polygon
        points={path}
        stroke={"black"}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="transparent"
      />
      <polygon
        points={path}
        stroke={`${color}`}
        strokeWidth={innerStrokeWidth}
        strokeLinejoin="round"
        fill="transparent"
      />
    </Group>
  );
};

export default Port;
