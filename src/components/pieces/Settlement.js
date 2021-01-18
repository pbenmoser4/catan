import React from "react";

const Settlement = ({ containerWidth, color, strokeWidth = 0.2, ...props }) => {
  const r = containerWidth / 2;
  return (
    <polygon
      points={`${r / 2}, ${(3 * r) / 4} ${r / 2}, ${(7 * r) / 4} ${
        (3 * r) / 2
      }, ${(7 * r) / 4} ${(3 * r) / 2}, ${(3 * r) / 4} ${r}, ${r / 4}`}
      fill={color}
      stroke="black"
      strokeWidth={`${strokeWidth}`}
    />
  );
};

export default Settlement;
