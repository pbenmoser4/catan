export const TILE = "TILE";
export const NODE = "NODE";
export const EDGE = "EDGE";
export const RESOURCE = "RESOURCE";

export const BRICK = "BRICK";
export const DESERT = "DESERT";
export const ORE = "ORE";
export const SHEEP = "SHEEP";
export const WATER = "WATER";
export const WHEAT = "WHEAT";
export const WOOD = "WOOD";

export const tileColors = {};
tileColors[BRICK] = "#A61603";
tileColors[DESERT] = "#F5E8A9";
tileColors[ORE] = "#4B4E57";
tileColors[SHEEP] = "#8BF557";
tileColors[WATER] = "#0565F2";
tileColors[WHEAT] = "#F5A817";
tileColors[WOOD] = "#1E8717";

export const tileCounts = {};
tileCounts[BRICK] = 3;
tileCounts[DESERT] = 1;
tileCounts[ORE] = 3;
tileCounts[SHEEP] = 4;
tileCounts[WHEAT] = 4;
tileCounts[WOOD] = 4;

export const pips = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];

export const pipColor = "#F0D79E";
export const pipBorder = "#40392A";

export const tileFormat = {
  resource: undefined,
  number: 0,
};
