import React from "react";

const Road = ({ startCoords, endCoords, color, strokeWidth = 1, ...props }) => {
  const roadFraction = 0.4;
  const opposite = Math.abs(endCoords.y - startCoords.y);
  const hypotenuse = Math.sqrt(
    Math.pow(endCoords.x - startCoords.x, 2) +
      Math.pow(endCoords.y - startCoords.y, 2)
  );
  const a = Math.asin(opposite / hypotenuse);
  const yOffset = Math.sin(a) * hypotenuse * ((1 - roadFraction) / 2);
  const xOffset = Math.cos(a) * hypotenuse * ((1 - roadFraction) / 2);
  let x1 = startCoords.x + xOffset;
  let y1 = startCoords.y + yOffset;
  let x2 = endCoords.x - xOffset;
  let y2 = endCoords.y - yOffset;
  if (startCoords.x > endCoords.x && startCoords.y < endCoords.y) {
    x1 = startCoords.x - xOffset;
    y1 = startCoords.y + yOffset;
    x2 = endCoords.x + xOffset;
    y2 = endCoords.y - yOffset;
  }

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth={`${strokeWidth * 1.4}`}
        strokeLinecap="square"
      />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={`${strokeWidth}`}
        strokeLinecap="square"
      />
    </g>
  );
};

export default Road;
