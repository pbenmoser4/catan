const BASE_STATE = {};

const boardReducer = (state = BASE_STATE, action) => {
  switch (action.type) {
    case "a":
      console.log("really?");
      return state;
    default:
      return state;
  }
};

export default boardReducer;
