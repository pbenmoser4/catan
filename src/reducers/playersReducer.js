import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import {
  ADD_PLAYER,
  END_TURN,
  START_GAME,
  START_GAMEPLAY_PHASE,
  START_PLACE_CITY_ACTION,
  START_PLACE_ROAD_ACTION,
  START_PLACE_SETTLEMENT_ACTION,
  PLACE_SETTLEMENT,
  PLACE_CITY,
  PLACE_ROAD,
  SET_ROLL_ORDER,
  UPDATE_PLAYER,
  UPDATE_PLAYERS,
} from "../actions/types";

import { availableIcons, playerColors } from "../util/constants";

const basePlayer = (
  id,
  displayName,
  icon,
  color,
  isActive = false,
  isThisPlayer = false,
  availableActions = []
) => {
  return {
    id: id,
    isActive: isActive, // maybe
    isThisPlayer: isThisPlayer,
    availableActions: availableActions,
    currentAction: null,
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
    settlements: [],
    cities: [],
    roads: [],
    score: 0,
  };
};

const BASE_STATE_TESTING = {
  players: [
    basePlayer(0, "Ben", availableIcons[0], playerColors[0], true, true, [
      START_GAME,
    ]),
    basePlayer(uuidv4(), "Maddie", availableIcons[1], playerColors[1]),
    basePlayer(uuidv4(), "Benedict", availableIcons[2], playerColors[2]),
    basePlayer(uuidv4(), "Alison", availableIcons[3], playerColors[3]),
  ],
  rollOrder: [],
  setupOrder: [],
  devMode: true,
  gameOwnerId: 0,
  turn: 0,
};

const BASE_STATE = {
  players: [],
  rollOrder: [],
  setupOrder: [],
  devMode: false,
  gameOwnerId: 0,
  turn: 0,
};

const playersReducer = (state = BASE_STATE_TESTING, action) => {
  let node = null;
  let edge = null;
  let player = null;
  let playerIndex = null;
  let playersCopy = null;

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
      return {
        ...state,
        players: playersNewOrder,
        setupOrder: setupOrder,
      };
    case SET_ROLL_ORDER:
      return { ...state, rollOrder: action.payload };
    case START_PLACE_SETTLEMENT_ACTION:
      player = action.payload;
      player["currentAction"] = PLACE_SETTLEMENT;
      playersCopy = _.cloneDeep(state.players);
      playerIndex = _.findIndex(playersCopy, { id: player.id });
      playersCopy[playerIndex] = player;
      return { ...state, players: playersCopy };
    case PLACE_SETTLEMENT:
      node = action.payload.node;
      player = action.payload.player;
      player.settlements.push(node);
      playersCopy = _.cloneDeep(state.players);
      playerIndex = _.findIndex(playersCopy, { id: player.id });
      playersCopy[playerIndex] = player;
      return { ...state, players: playersCopy };
    case START_PLACE_CITY_ACTION:
      player = action.payload;
      player["currentAction"] = PLACE_CITY;
      playersCopy = _.cloneDeep(state.players);
      playerIndex = _.findIndex(playersCopy, { id: player.id });
      playersCopy[playerIndex] = player;
      return { ...state, players: playersCopy };
    case PLACE_CITY:
      node = action.payload.node;
      player = action.payload.player;
      player.cities.push(node);
      _.remove(
        player.settlements,
        (n) => n.row === node.row && n.col === node.col
      );
      playersCopy = _.cloneDeep(state.players);
      playerIndex = _.findIndex(playersCopy, { id: player.id });
      playersCopy[playerIndex] = player;
      return { ...state, players: playersCopy };
    case START_PLACE_ROAD_ACTION:
      player = action.payload;
      player["currentAction"] = PLACE_ROAD;
      playersCopy = _.cloneDeep(state.players);
      playerIndex = _.findIndex(playersCopy, { id: player.id });
      playersCopy[playerIndex] = player;
      return { ...state, players: playersCopy };
    case PLACE_ROAD:
      edge = action.payload.edge;
      player = action.payload.player;
      player.roads.push(edge);
      playersCopy = _.cloneDeep(state.players);
      playerIndex = _.findIndex(playersCopy, { id: player.id });
      playersCopy[playerIndex] = player;
      return { ...state, players: playersCopy };
    case UPDATE_PLAYER:
      playerIndex = action.payload.playerIndex;
      player = action.payload.player;
      playersCopy = _.cloneDeep(state.players);
      playersCopy[playerIndex] = player;
      return { ...state, players: playersCopy };
    case UPDATE_PLAYERS:
      return { ...state, players: action.payload };
    default:
      return state;
  }
};

export default playersReducer;
