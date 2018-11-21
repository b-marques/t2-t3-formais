import * as actionType from "../actions/ActionType";

const analyserReducer = (state = 0, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case actionType.UPDATE_CODE:
      newState.lexical.processInput(action.text);

      return newState;

    default:
      return newState;
  }
};
export default analyserReducer;
