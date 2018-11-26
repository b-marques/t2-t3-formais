import * as actionType from "./ActionType";

export const updateCode = text => ({
  type: actionType.UPDATE_CODE,
  text: text
});

export const codeAnalysis = symbol_table => ({
  type: actionType.CODE_ANALYSIS,
  symbol_table: symbol_table
});
