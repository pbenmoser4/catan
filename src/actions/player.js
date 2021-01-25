import { SET_THIS_PLAYER } from "./types";

export const setThisPlayer = (id) => (dispatch, getState) => {
  dispatch({
    type: SET_THIS_PLAYER,
    payload: id,
  });
};
