import React, { useEffect, useState } from "react";

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
      {dotLocations.map((loc) => (
        <circle
          cx={x ? x + loc[0] : loc[0]}
          cy={y ? y + loc[1] : loc[1]}
          r={width / 10}
        />
      ))}
    </Group>
  );
};

const Die = ({ x, y, width, height, number, animate = true, ...props }) => {
  const [animating, setAnimating] = useState(animate);
  const [animationCount, setAnimationCount] = useState(0);
  const [num, setNum] = useState(Math.ceil(Math.random() * 6));
  const animationUpdates = 10;
  const animationTime = 1500;
  const timePerAnimation = animationTime / animationUpdates;

  useEffect(() => {
    console.log("animating");
    const interID = setInterval(() => {
      setNum(Math.ceil(Math.random() * 6));
      setAnimationCount(animationCount + 1);
    }, timePerAnimation);
    setTimeout(() => {
      setAnimating(false);
      setNum(number);
      clearInterval(interID);
    }, animationTime);
  }, [animating]);
  return (
    <Group>
      <rect
        x={x ? x : "0"}
        y={y ? y : "0"}
        width={width}
        height={height}
        fill="white"
        rx="0.5"
      />
      <DieFace
        x={x ? parseInt(x) : 0}
        y={y ? parseInt(y) : 0}
        number={num}
        width={parseInt(width)}
      />
    </Group>
  );
};

export default Die;
