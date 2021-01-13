import _ from "lodash";
import { Diamond, IceCream, Launch, Trigger } from "grommet-icons";

import { ADD_PLAYER } from "../actions/types";

const iconSize = "small";

const availableIcons = [
  <Diamond size={iconSize} />,
  <IceCream size={iconSize} />,
  <Launch size={iconSize} />,
  <Trigger size={iconSize} />,
];

const basePlayer = (id, displayName) => {
  return {
    id: id,
    icon: availableIcons[id],
    displayName: displayName,
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
    },
  };
};

const BASE_STATE = {
  players: [basePlayer(0, "Benito")],
};

const playersReducer = (state = BASE_STATE, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      const { displayName, id } = action.payload;
      const currentPlayers = _.clone(state.players);
      currentPlayers.push(basePlayer(id, displayName));

      return { ...state, players: currentPlayers };
    default:
      return state;
  }
};

export default playersReducer;
