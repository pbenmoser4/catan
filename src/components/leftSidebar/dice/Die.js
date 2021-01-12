import React, { useEffect, useState } from "react";

import { Group } from "@visx/group";

import DieFace from "./DieFace";

const Die = ({
  x,
  y,
  width,
  height,
  setter,
  number,
  background,
  onAnimationFinished,
  animating = true,
  ...props
}) => {
  const [num, setNum] = useState(Math.ceil(Math.random() * 6));
  const animationUpdates = 30;
  const animationTime = 3000;
  const timePerAnimation = animationTime / animationUpdates;

  const animate = (duration) => {
    let count = 0;
    const interID = setInterval(() => {
      setNum(Math.ceil(Math.random() * 6));
      ++count;
    }, timePerAnimation);
    setTimeout(() => {
      clearInterval(interID);
      if (setter) {
        onAnimationFinished();
      }
    }, animationTime);
  };

  useEffect(() => {
    if (animating) {
      animate(animationUpdates);
    }
  }, [animating]);

  const strokeWidth = 0;

  return (
    <Group>
      <rect
        x={x ? x + strokeWidth : strokeWidth}
        y={y ? y + strokeWidth : strokeWidth}
        width={width - 2 * strokeWidth}
        height={height - 2 * strokeWidth}
        fill={background}
        rx="0.5"
        stroke="black"
        strokeWidth={strokeWidth}
      />
      <DieFace
        x={x ? parseInt(x) : 0}
        y={y ? parseInt(y) : 0}
        number={animating ? num : number}
        width={parseInt(width)}
      />
    </Group>
  );
};

export default Die;
