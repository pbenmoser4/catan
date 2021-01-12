import React from "react";

import { Group } from "@visx/group";

import Die from "./Die";

const Dice = ({
  width,
  pad,
  numbers,
  animating,
  onAnimationFinished,
  ...props
}) => {
  const componentWidth = width > 250 ? 250 - 4 * pad : width - 4 * pad;
  const viewBoxArray = [0, 0, 10, 4];
  const viewBoxString = viewBoxArray.map((_) => String(_)).join(" ");

  return (
    <svg
      viewBox={viewBoxString}
      width={componentWidth}
      height={componentWidth * 0.4}
    >
      <Group>
        <Die
          width={4}
          height={4}
          number={numbers[0]}
          animating={animating}
          background="#D41C0B"
          onAnimationFinished={onAnimationFinished}
          setter
        />
        <Die
          x={6}
          width={4}
          height={4}
          background="#EDCB0C"
          number={numbers[1]}
          animating={animating}
          onAnimationFinished={onAnimationFinished}
        />
      </Group>
    </svg>
  );
};

export default Dice;
