import React from "react";

import { Group } from "@visx/group";

const DieFace = ({ x, y, width, number }) => {
  let dotLocations = [];
  switch (number) {
    case 1:
      dotLocations = [[2, 2]];
      break;
    case 2:
      dotLocations = [
        [1, 1],
        [3, 3],
      ];
      break;
    case 3:
      dotLocations = [
        [1, 1],
        [2, 2],
        [3, 3],
      ];
      break;
    case 4:
      dotLocations = [
        [1, 1],
        [1, 3],
        [3, 1],
        [3, 3],
      ];
      break;
    case 5:
      dotLocations = [
        [1, 1],
        [1, 3],
        [3, 1],
        [3, 3],
        [2, 2],
      ];
      break;
    case 6:
      dotLocations = [
        [1, 1],
        [1, 2],
        [1, 3],
        [3, 1],
        [3, 2],
        [3, 3],
      ];
      break;
    default:
      dotLocations = [];
  }
  return (
    <Group>
      {dotLocations.map((loc, i) => (
        <circle
          cx={x ? x + loc[0] : loc[0]}
          cy={y ? y + loc[1] : loc[1]}
          r={width / 10}
          key={i}
        />
      ))}
    </Group>
  );
};

export default DieFace;
