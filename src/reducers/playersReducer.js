import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Diamond, IceCream, Launch, Trigger } from "grommet-icons";

import {
  ADD_PLAYER,
  START_GAME,
  PLACE_SETTLEMENT,
  PLACE_CITY,
  PLACE_ROAD,
} from "../actions/types";

import {
  ROLL,
  BUILD,
  BUY,
  TRADE,
  USE,
  STEAL,
  START,
  PLACE,
  availableIcons,
  playerColors,
} from "../util/constants";

const basePlayer = (
  id,
  displayName,
  icon,
  color,
  isActive = false,
  isThisPlayer = false
) => {
  return {
    id: id,
    isActive: isActive, // maybe
    isThisPlayer: isThisPlayer,
    availableActions: [START],
    icon: icon,
    color: color,
    displayName: displayName,
    longestRoad: false,
    largestArmy: false,
    hand: {
      resources: {
        BRICK: 0,
        ORE: 0,
        SHEEP: 0,
        WHEAT: 0,
        WOOD: 0,
      },
      developmentCards: {
        KNIGHT: 0,
        ROAD_BUILDING: 0,
        YEAR_OF_PLENTY: 0,
        MONOPOLY: 0,
        VICTORY_POINT: 0,
      },
      playedDevelopmentCards: {
        KNIGHT: 0,
        ROAD_BUILDING: 0,
        YEAR_OF_PLENTY: 0,
        MONOPOLY: 0,
        VICTORY_POINT: 0,
      },
    },
    score: 0,
  };
};

const BASE_STATE_TESTING = {
  players: [
    basePlayer(0, "Ben", availableIcons[0], playerColors[0], true, true),
    basePlayer(uuidv4(), "Maddie", availableIcons[1], playerColors[1]),
    basePlayer(uuidv4(), "Benedict", availableIcons[2], playerColors[2]),
    basePlayer(uuidv4(), "LONGNAME", availableIcons[3], playerColors[3]),
  ],
  rollOrder: [],
  setupOrder: [],
  devMode: true,
};

const BASE_STATE = {
  players: [],
  rollOrder: [],
  setupOrder: [],
};

const playersReducer = (state = BASE_STATE_TESTING, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      const { displayName, id } = action.payload;
      const currentPlayers = _.clone(state.players);

      currentPlayers.push(
        basePlayer(
          id,
          displayName,
          availableIcons[currentPlayers.length],
          playerColors[currentPlayers.length]
        )
      );

      return { ...state, players: currentPlayers };
    case START_GAME:
      let playersNewOrder = _.shuffle(state.players);
      playersNewOrder = playersNewOrder.map((p, i) => {
        if (i === 0) {
          // new currently active player
          p.isActive = true;
          p.availableActions = [PLACE_SETTLEMENT];
          if (state.devMode) {
            p.isThisPlayer = true;
          }
        } else {
          // This isn't the currently active player
          p.isActive = false;
          p.availableActions = [];
          if (state.devMode) {
            p.isThisPlayer = false;
          }
        }
        return p;
      });
      const setupOrder = playersNewOrder.map((p) => p.id);
      return { ...state, players: playersNewOrder, setupOrder: setupOrder };
    default:
      return state;
  }
};

export default playersReducer;
