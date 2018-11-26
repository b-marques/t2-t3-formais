import * as actionType from "../actions/ActionType";

const analyserReducer = (state = 0, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case actionType.UPDATE_CODE:
      newState.lexical.processInput(action.text);

      return newState;

    case actionType.CODE_ANALYSIS:
      newState.syntactic.analysis(action.symbol_table);

      return newState;

    default:
      return newState;
  }
};
export default analyserReducer;
