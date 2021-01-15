import { Diamond, IceCream, Launch, Trigger } from "grommet-icons";

export const TILE = "TILE";
export const NODE = "NODE";
export const EDGE = "EDGE";
export const RESOURCE = "RESOURCE";
export const PORT_RESOURCE = "PORT_RESOURCE";
export const PORT_DIRECTION = "PORT_DIRECTION";

export const BRICK = "BRICK";
export const DESERT = "DESERT";
export const ORE = "ORE";
export const SHEEP = "SHEEP";
export const WATER = "WATER";
export const WHEAT = "WHEAT";
export const WOOD = "WOOD";
export const ANY = "ANY";

export const DEVELOPMENT_CARD = "DEVELOPMENT_CARD";
export const KNIGHT = "KNIGHT";
export const MONOPOLY = "MONOPOLY";
export const ROAD_BUILDING = "ROAD_BUILDING";
export const VICTORY_POINT = "VICTORY_POINT";
export const YEAR_OF_PLENTY = "YEAR_OF_PLENTY";

//// TODO: Fill in the "Name" and "Description" for each type of d card
export const developmentCardText = {};
developmentCardText[KNIGHT] = { name: "", description: "" };
developmentCardText[MONOPOLY] = { name: "", description: "" };
developmentCardText[ROAD_BUILDING] = { name: "", description: "" };
developmentCardText[VICTORY_POINT] = { name: "", description: "" };
developmentCardText[YEAR_OF_PLENTY] = { name: "", description: "" };

export const tileColors = {};
tileColors[BRICK] = "#A61603";
tileColors[DESERT] = "#F5E8A9";
tileColors[ORE] = "#59646E";
tileColors[SHEEP] = "#8BF557";
tileColors[WATER] = "#0669E3";
tileColors[WHEAT] = "#F5A817";
tileColors[WOOD] = "#1E8717";
tileColors[ANY] = "#F0D79E";

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

export const ports = [
  { tileIndex: { row: 0, col: 3 }, PORT_DIRECTION: "dd" },
  { tileIndex: { row: 2, col: 1 }, PORT_DIRECTION: "dr" },
  { tileIndex: { row: 2, col: 5 }, PORT_DIRECTION: "dl" },
  { tileIndex: { row: 5, col: 0 }, PORT_DIRECTION: "dr" },
  { tileIndex: { row: 5, col: 6 }, PORT_DIRECTION: "dl" },
  { tileIndex: { row: 9, col: 6 }, PORT_DIRECTION: "ul" },
  { tileIndex: { row: 9, col: 0 }, PORT_DIRECTION: "ur" },
  { tileIndex: { row: 11, col: 2 }, PORT_DIRECTION: "uu" },
  { tileIndex: { row: 11, col: 4 }, PORT_DIRECTION: "uu" },
];

export const portCounts = {};
portCounts[BRICK] = 1;
portCounts[ORE] = 1;
portCounts[SHEEP] = 1;
portCounts[WHEAT] = 1;
portCounts[WOOD] = 1;
portCounts[ANY] = 4;

export const tileFormat = {
  resource: undefined,
  number: 0,
};

export const NODE_CLICK = "NODE_CLICK";
export const TILE_CLICK = "TILE_CLICK";
export const EDGE_CLICK = "EDGE_CLICK";

export const BUILD = "BUILD";
export const BUY = "BUY";
export const END = "END";
export const PLACE = "PLACE";
export const ROLL = "ROLL";
export const START = "START";
export const STEAL = "STEAL";
export const TRADE = "TRADE";
export const USE = "USE";

export const actionLabels = {};
actionLabels[BUILD] = "Build";
actionLabels[BUY] = "Buy";
actionLabels[END] = "End Turn";
actionLabels[PLACE] = "Place Item";
actionLabels[ROLL] = "Roll";
actionLabels[START] = "Start Game";
actionLabels[STEAL] = "Steal";
actionLabels[TRADE] = "Propose Trade";
actionLabels[USE] = "Use Development Card";

export const playerColors = [
  "#D41C0B", // Red
  "#EDCB0C", // Yellow
  "#FFFFFA", // White
  "#0669E3", // Blue
];

const iconSize = "medium";
export const availableIcons = [
  <Diamond size={iconSize} />,
  <IceCream size={iconSize} />,
  <Launch size={iconSize} />,
  <Trigger size={iconSize} />,
];

export const developmentCardColor = "#8F92B3";
export const resourceCardColor = "#B3AB8F";
