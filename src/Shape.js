import Lexical from "./logic/lexical";
import Synctatic from "./logic/syntactic";
// import Grammar from "./logic/Grammar";

export const initial_shape = {
  analyserReducer: {
    lexical: new Lexical(),
    synctatic: new Synctatic()
  }
};
