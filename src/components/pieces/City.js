import React from "react";

const City = ({ containerWidth, color, strokeWidth = 0.2, ...props }) => {
  const r = containerWidth / 2;
  // const strokeWidth = 0.2;

  // const { strokeWidth } = props;
  return (
    <polygon
      points={`${strokeWidth}, ${r / 2}
      ${strokeWidth}, ${2 * r - strokeWidth}
      ${2 * r - strokeWidth}, ${2 * r - strokeWidth}
      ${2 * r - strokeWidth}, ${r}
      ${r}, ${r}
      ${r}, ${r / 2}
      ${r / 2}, ${strokeWidth}`}
      fill={color}
      stroke="black"
      strokeWidth={`${strokeWidth}`}
    />
  );
};

export default City;
