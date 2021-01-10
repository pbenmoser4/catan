import React from "react";

import { Group } from "@visx/group";

import Die from "./Die";

const Dice = ({ width, pad, ...props }) => {
  const componentWidth = width - 4 * pad;
  const viewBoxArray = [0, 0, 10, 4];
  const viewBoxString = viewBoxArray.map((_) => String(_)).join(" ");
  console.log(viewBoxString);
  return (
    <svg
      viewBox={viewBoxString}
      width={componentWidth}
      height={componentWidth * 0.4}
    >
      <Group>
        <Die width="4" height="4" number={5} />
        <Die x="6" width="4" height="4" number={6} />
      </Group>
    </svg>
  );
};

export default Dice;
