import * as actionType from "./ActionType";

export const updateCode = text => ({
  type: actionType.UPDATE_CODE,
  text: text
});
