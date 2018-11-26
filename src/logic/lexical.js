export default class Lexical {
  constructor(input) {
    this.id = 1;
    this.input = input;
    this.reserved_stuff = [
      { lexema: "while", token: "RW", detail: "" },
      { lexema: "do", token: "RW", detail: "" },
      { lexema: "break", token: "RW", detail: "" },
      { lexema: "if", token: "RW", detail: "" },
      { lexema: "then", token: "RW", detail: "" },
      { lexema: "else", token: "RW", detail: "" },
      { lexema: "true", token: "RW", detail: "" },
      { lexema: "false", token: "RW", detail: "" },
      { lexema: "basic", token: "RW", detail: "" },
      { lexema: "*", token: "ARITOP", detail: "Multiplication" },
      { lexema: "/", token: "ARITOP", detail: "Division" },
      { lexema: "+", token: "ARITOP", detail: "Addition" },
      { lexema: "-", token: "ARITOP", detail: "Subtraction" },
      { lexema: ";", token: "PUNCTUATION", detail: "Semicolon" },
      { lexema: "(", token: "PUNCTUATION", detail: "Left parenthesis" },
      { lexema: ")", token: "PUNCTUATION", detail: "Right parenthesis" },
      { lexema: "{", token: "PUNCTUATION", detail: "Left Brace" },
      { lexema: "}", token: "PUNCTUATION", detail: "Right Brace" },
      { lexema: "[", token: "PUNCTUATION", detail: "Left Bracket" },
      { lexema: "]", token: "PUNCTUATION", detail: "Right Bracket" },
      { lexema: "<", token: "RELOP", detail: "Less than" },
      { lexema: "<=", token: "RELOP", detail: "Less than or equal to" },
      { lexema: ">", token: "RELOP", detail: "Greater than" },
      { lexema: ">=", token: "RELOP", detail: "Greater than or equal to" },
      { lexema: "==", token: "RELOP", detail: "Equal" },
      { lexema: "!=", token: "RELOP", detail: "Not Equal" },
      { lexema: "&&", token: "LOGICOP", detail: "Logical AND" },
      { lexema: "||", token: "LOGICOP", detail: "Logical OR" },
      { lexema: "!", token: "LOGICOP", detail: "Logical NOT" },
      { lexema: "=", token: "ASSIGNMENT", detail: "" }
    ];
    this.symbol_table = [];
    this.error_table = [];

    this.alphabet = new Set([
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "*",
      "/",
      "+",
      "-",
      ";",
      "(",
      ")",
      "{",
      "}",
      "[",
      "]",
      "<",
      ">",
      "=",
      "!",
      "&",
      "|",
      "."
    ]);
    this.states = new Set([
      "q0",
      "*",
      "/",
      "+",
      "-",
      ";",
      "(",
      ")",
      "{",
      "}",
      "[",
      "]",
      "<",
      "<=",
      ">",
      ">=",
      "=",
      "==",
      "!",
      "!=",
      "&",
      "&&",
      "|",
      "||",
      "identifier",
      "num",
      "real",
      "error"
    ]);
    this.finals = new Set([
      "*",
      "/",
      "+",
      "-",
      ";",
      "(",
      ")",
      "{",
      "}",
      "[",
      "]",
      "<",
      "<=",
      ">",
      ">=",
      "=",
      "==",
      "!",
      "!=",
      "&&",
      "||",
      "identifier",
      "num",
      "real"
    ]);
    this.initial = "q0";
    this.transitions = [];
    for (let state of this.states) {
      this.transitions[state] = [];
      for (let symbol of this.alphabet) {
        this.transitions[state][symbol] = { to: new Set(["error"]) };
      }
    }

    // Define transitions from initial state
    this.transitions["q0"]["a"].to = new Set(["identifier"]);
    this.transitions["q0"]["b"].to = new Set(["identifier"]);
    this.transitions["q0"]["c"].to = new Set(["identifier"]);
    this.transitions["q0"]["d"].to = new Set(["identifier"]);
    this.transitions["q0"]["e"].to = new Set(["identifier"]);
    this.transitions["q0"]["f"].to = new Set(["identifier"]);
    this.transitions["q0"]["g"].to = new Set(["identifier"]);
    this.transitions["q0"]["h"].to = new Set(["identifier"]);
    this.transitions["q0"]["i"].to = new Set(["identifier"]);
    this.transitions["q0"]["j"].to = new Set(["identifier"]);
    this.transitions["q0"]["k"].to = new Set(["identifier"]);
    this.transitions["q0"]["l"].to = new Set(["identifier"]);
    this.transitions["q0"]["m"].to = new Set(["identifier"]);
    this.transitions["q0"]["n"].to = new Set(["identifier"]);
    this.transitions["q0"]["o"].to = new Set(["identifier"]);
    this.transitions["q0"]["p"].to = new Set(["identifier"]);
    this.transitions["q0"]["q"].to = new Set(["identifier"]);
    this.transitions["q0"]["r"].to = new Set(["identifier"]);
    this.transitions["q0"]["s"].to = new Set(["identifier"]);
    this.transitions["q0"]["t"].to = new Set(["identifier"]);
    this.transitions["q0"]["u"].to = new Set(["identifier"]);
    this.transitions["q0"]["v"].to = new Set(["identifier"]);
    this.transitions["q0"]["w"].to = new Set(["identifier"]);
    this.transitions["q0"]["x"].to = new Set(["identifier"]);
    this.transitions["q0"]["y"].to = new Set(["identifier"]);
    this.transitions["q0"]["z"].to = new Set(["identifier"]);
    this.transitions["q0"]["A"].to = new Set(["identifier"]);
    this.transitions["q0"]["B"].to = new Set(["identifier"]);
    this.transitions["q0"]["C"].to = new Set(["identifier"]);
    this.transitions["q0"]["D"].to = new Set(["identifier"]);
    this.transitions["q0"]["E"].to = new Set(["identifier"]);
    this.transitions["q0"]["F"].to = new Set(["identifier"]);
    this.transitions["q0"]["G"].to = new Set(["identifier"]);
    this.transitions["q0"]["H"].to = new Set(["identifier"]);
    this.transitions["q0"]["I"].to = new Set(["identifier"]);
    this.transitions["q0"]["J"].to = new Set(["identifier"]);
    this.transitions["q0"]["K"].to = new Set(["identifier"]);
    this.transitions["q0"]["L"].to = new Set(["identifier"]);
    this.transitions["q0"]["M"].to = new Set(["identifier"]);
    this.transitions["q0"]["N"].to = new Set(["identifier"]);
    this.transitions["q0"]["O"].to = new Set(["identifier"]);
    this.transitions["q0"]["P"].to = new Set(["identifier"]);
    this.transitions["q0"]["Q"].to = new Set(["identifier"]);
    this.transitions["q0"]["R"].to = new Set(["identifier"]);
    this.transitions["q0"]["S"].to = new Set(["identifier"]);
    this.transitions["q0"]["T"].to = new Set(["identifier"]);
    this.transitions["q0"]["U"].to = new Set(["identifier"]);
    this.transitions["q0"]["V"].to = new Set(["identifier"]);
    this.transitions["q0"]["W"].to = new Set(["identifier"]);
    this.transitions["q0"]["X"].to = new Set(["identifier"]);
    this.transitions["q0"]["Y"].to = new Set(["identifier"]);
    this.transitions["q0"]["Z"].to = new Set(["identifier"]);
    this.transitions["q0"]["0"].to = new Set(["num"]);
    this.transitions["q0"]["1"].to = new Set(["num"]);
    this.transitions["q0"]["2"].to = new Set(["num"]);
    this.transitions["q0"]["3"].to = new Set(["num"]);
    this.transitions["q0"]["4"].to = new Set(["num"]);
    this.transitions["q0"]["5"].to = new Set(["num"]);
    this.transitions["q0"]["6"].to = new Set(["num"]);
    this.transitions["q0"]["7"].to = new Set(["num"]);
    this.transitions["q0"]["8"].to = new Set(["num"]);
    this.transitions["q0"]["9"].to = new Set(["num"]);
    this.transitions["q0"]["*"].to = new Set(["*"]);
    this.transitions["q0"]["/"].to = new Set(["/"]);
    this.transitions["q0"]["+"].to = new Set(["+"]);
    this.transitions["q0"]["-"].to = new Set(["-"]);
    this.transitions["q0"][";"].to = new Set([";"]);
    this.transitions["q0"]["("].to = new Set(["("]);
    this.transitions["q0"][")"].to = new Set([")"]);
    this.transitions["q0"]["{"].to = new Set(["{"]);
    this.transitions["q0"]["}"].to = new Set(["}"]);
    this.transitions["q0"]["["].to = new Set(["["]);
    this.transitions["q0"]["]"].to = new Set(["]"]);
    this.transitions["q0"]["<"].to = new Set(["<"]);
    this.transitions["q0"][">"].to = new Set([">"]);
    this.transitions["q0"]["="].to = new Set(["="]);
    this.transitions["q0"]["!"].to = new Set(["!"]);
    this.transitions["q0"]["&"].to = new Set(["&"]);
    this.transitions["q0"]["|"].to = new Set(["|"]);
    this.transitions["q0"]["."].to = new Set(["error"]);

    this.transitions["<"]["="].to = new Set(["<="]);
    this.transitions[">"]["="].to = new Set([">="]);
    this.transitions["="]["="].to = new Set(["=="]);
    this.transitions["!"]["="].to = new Set(["!="]);
    this.transitions["&"]["&"].to = new Set(["&&"]);
    this.transitions["|"]["|"].to = new Set(["||"]);

    this.transitions["identifier"]["a"].to = new Set(["identifier"]);
    this.transitions["identifier"]["b"].to = new Set(["identifier"]);
    this.transitions["identifier"]["c"].to = new Set(["identifier"]);
    this.transitions["identifier"]["d"].to = new Set(["identifier"]);
    this.transitions["identifier"]["e"].to = new Set(["identifier"]);
    this.transitions["identifier"]["f"].to = new Set(["identifier"]);
    this.transitions["identifier"]["g"].to = new Set(["identifier"]);
    this.transitions["identifier"]["h"].to = new Set(["identifier"]);
    this.transitions["identifier"]["i"].to = new Set(["identifier"]);
    this.transitions["identifier"]["j"].to = new Set(["identifier"]);
    this.transitions["identifier"]["k"].to = new Set(["identifier"]);
    this.transitions["identifier"]["l"].to = new Set(["identifier"]);
    this.transitions["identifier"]["m"].to = new Set(["identifier"]);
    this.transitions["identifier"]["n"].to = new Set(["identifier"]);
    this.transitions["identifier"]["o"].to = new Set(["identifier"]);
    this.transitions["identifier"]["p"].to = new Set(["identifier"]);
    this.transitions["identifier"]["q"].to = new Set(["identifier"]);
    this.transitions["identifier"]["r"].to = new Set(["identifier"]);
    this.transitions["identifier"]["s"].to = new Set(["identifier"]);
    this.transitions["identifier"]["t"].to = new Set(["identifier"]);
    this.transitions["identifier"]["u"].to = new Set(["identifier"]);
    this.transitions["identifier"]["v"].to = new Set(["identifier"]);
    this.transitions["identifier"]["w"].to = new Set(["identifier"]);
    this.transitions["identifier"]["x"].to = new Set(["identifier"]);
    this.transitions["identifier"]["y"].to = new Set(["identifier"]);
    this.transitions["identifier"]["z"].to = new Set(["identifier"]);
    this.transitions["identifier"]["A"].to = new Set(["identifier"]);
    this.transitions["identifier"]["B"].to = new Set(["identifier"]);
    this.transitions["identifier"]["C"].to = new Set(["identifier"]);
    this.transitions["identifier"]["D"].to = new Set(["identifier"]);
    this.transitions["identifier"]["E"].to = new Set(["identifier"]);
    this.transitions["identifier"]["F"].to = new Set(["identifier"]);
    this.transitions["identifier"]["G"].to = new Set(["identifier"]);
    this.transitions["identifier"]["H"].to = new Set(["identifier"]);
    this.transitions["identifier"]["I"].to = new Set(["identifier"]);
    this.transitions["identifier"]["J"].to = new Set(["identifier"]);
    this.transitions["identifier"]["K"].to = new Set(["identifier"]);
    this.transitions["identifier"]["L"].to = new Set(["identifier"]);
    this.transitions["identifier"]["M"].to = new Set(["identifier"]);
    this.transitions["identifier"]["N"].to = new Set(["identifier"]);
    this.transitions["identifier"]["O"].to = new Set(["identifier"]);
    this.transitions["identifier"]["P"].to = new Set(["identifier"]);
    this.transitions["identifier"]["Q"].to = new Set(["identifier"]);
    this.transitions["identifier"]["R"].to = new Set(["identifier"]);
    this.transitions["identifier"]["S"].to = new Set(["identifier"]);
    this.transitions["identifier"]["T"].to = new Set(["identifier"]);
    this.transitions["identifier"]["U"].to = new Set(["identifier"]);
    this.transitions["identifier"]["V"].to = new Set(["identifier"]);
    this.transitions["identifier"]["W"].to = new Set(["identifier"]);
    this.transitions["identifier"]["X"].to = new Set(["identifier"]);
    this.transitions["identifier"]["Y"].to = new Set(["identifier"]);
    this.transitions["identifier"]["Z"].to = new Set(["identifier"]);
    this.transitions["identifier"]["0"].to = new Set(["identifier"]);
    this.transitions["identifier"]["1"].to = new Set(["identifier"]);
    this.transitions["identifier"]["2"].to = new Set(["identifier"]);
    this.transitions["identifier"]["3"].to = new Set(["identifier"]);
    this.transitions["identifier"]["4"].to = new Set(["identifier"]);
    this.transitions["identifier"]["5"].to = new Set(["identifier"]);
    this.transitions["identifier"]["6"].to = new Set(["identifier"]);
    this.transitions["identifier"]["7"].to = new Set(["identifier"]);
    this.transitions["identifier"]["8"].to = new Set(["identifier"]);
    this.transitions["identifier"]["9"].to = new Set(["identifier"]);

    this.transitions["num"]["0"].to = new Set(["num"]);
    this.transitions["num"]["1"].to = new Set(["num"]);
    this.transitions["num"]["2"].to = new Set(["num"]);
    this.transitions["num"]["3"].to = new Set(["num"]);
    this.transitions["num"]["4"].to = new Set(["num"]);
    this.transitions["num"]["5"].to = new Set(["num"]);
    this.transitions["num"]["6"].to = new Set(["num"]);
    this.transitions["num"]["7"].to = new Set(["num"]);
    this.transitions["num"]["8"].to = new Set(["num"]);
    this.transitions["num"]["9"].to = new Set(["num"]);
    this.transitions["num"]["."].to = new Set(["real"]);

    this.transitions["real"]["0"].to = new Set(["real"]);
    this.transitions["real"]["1"].to = new Set(["real"]);
    this.transitions["real"]["2"].to = new Set(["real"]);
    this.transitions["real"]["3"].to = new Set(["real"]);
    this.transitions["real"]["4"].to = new Set(["real"]);
    this.transitions["real"]["5"].to = new Set(["real"]);
    this.transitions["real"]["6"].to = new Set(["real"]);
    this.transitions["real"]["7"].to = new Set(["real"]);
    this.transitions["real"]["8"].to = new Set(["real"]);
    this.transitions["real"]["9"].to = new Set(["real"]);

    // console.log(this.transitions);
  }

  processInput(input) {
    this.reset_ids();

    this.input = input;
    // Prepare to analysis, managing whitespaces
    let splitted_input = input.replace(/[ \t\r]+/g, " ");
    splitted_input = splitted_input.replace(/\n/g, " \n ");
    splitted_input = splitted_input.replace(/;/g, " ; ");
    splitted_input = splitted_input.replace(/\(/g, " ( ");
    splitted_input = splitted_input.replace(/\)/g, " ) ");
    splitted_input = splitted_input.replace(/\{/g, " { ");
    splitted_input = splitted_input.replace(/\}/g, " } ");
    splitted_input = splitted_input.replace(/\[/g, " [ ");
    splitted_input = splitted_input.replace(/\]/g, " ] ");

    // Split by whitespace to read lexeme
    splitted_input = splitted_input.split(" ");
    let line_number = 1;

    for (let lexeme of splitted_input) {
      let state = "q0";
      let characters = lexeme.split("");
      for (let char of characters) {
        if (char === "\n") {
          line_number++;
        } else if (this.transitions[state][char] === undefined) {
          state = "error";
        } else {
          state = [...this.transitions[state][char].to][0];
        }
      }

      if (this.finals.has(state)) {
        let info;
        switch (state) {
          case "identifier":
            info = this.reserved_stuff.filter(e => e.lexema === lexeme);
            if (info.length === 0) {
              this.symbol_table.push({
                id: this.id++,
                lexema: lexeme,
                token: "ID",
                detail: "",
                line: line_number
              });
            } else {
              this.symbol_table.push({
                id: this.id++,
                token: info[0].token,
                lexema: info[0].lexema,
                detail: info[0].detail,
                line: line_number
              });
            }
            break;
          case "num":
            this.symbol_table.push({
              id: this.id++,
              lexema: lexeme,
              token: "NUM",
              detail: "",
              line: line_number
            });
            break;
          case "real":
            this.symbol_table.push({
              id: this.id++,
              lexema: lexeme,
              token: "REAL",
              detail: "",
              line: line_number
            });
            break;
          default:
            info = this.reserved_stuff.filter(e => e.lexema === state);
            this.symbol_table.push({
              id: this.id++,
              token: info[0].token,
              lexema: info[0].lexema,
              detail: info[0].detail,
              line: line_number
            });
            break;
        }
      } else if (state === "q0") {
        // do nothing
      } else {
        this.error_table.push({ line: line_number });
      }
    }
  }

  //   processInput(input) {
  //     this.reset_ids();

  //     this.input = input;
  //     // Prepare to analysis, managing whitespaces
  //     let splitted_input = input.replace(/[ \t\r\n]+/g, " ");
  //     splitted_input = splitted_input.replace(/;/g, " ; ");
  //     splitted_input = splitted_input.replace(/\(/g, " ( ");
  //     splitted_input = splitted_input.replace(/\)/g, " ) ");
  //     splitted_input = splitted_input.replace(/\{/g, " { ");
  //     splitted_input = splitted_input.replace(/\}/g, " } ");
  //     splitted_input = splitted_input.replace(/\[/g, " [ ");
  //     splitted_input = splitted_input.replace(/\]/g, " ] ");

  //     // Split by whitespace to read lexeme
  //     splitted_input = splitted_input.split(" ");

  //     for (let lexema of splitted_input) {
  //       // Check if is reserved word or special character
  //       let element = this.already_on_reserved_stuff(lexema);
  //       if (element) {
  //         let index = this.reserved_stuff.indexOf(element);
  //         this.symbol_table.push({
  //           id: this.id++,
  //           lexema: lexema,
  //           token: this.reserved_stuff[index].token,
  //           detail: this.reserved_stuff[index].detail
  //         });
  //       } else if (this.is_valid_id(lexema)) {
  //         let element = this.already_on_symbol_table(lexema);
  //         if (element) {
  //           let index = this.symbol_table.indexOf(element);
  //           this.symbol_table.push({
  //             id: this.id++,
  //             lexema: lexema,
  //             token: this.symbol_table[index].token,
  //             detail: this.symbol_table[index].detail
  //           });
  //         } else {
  //           this.symbol_table.push({
  //             id: this.id++,
  //             lexema: lexema,
  //             token: "ID",
  //             detail: ""
  //           });
  //         }
  //       } else if (this.is_valid_num(lexema)) {
  //         let element = this.already_on_symbol_table(lexema);
  //         if (element) {
  //           let indexficou tankan = this.symbol_table.indexOf(element);
  //           this.symbol_table.push({
  //             id: this.id++,
  //             lexema: lexema,
  //             token: this.symbol_table[index].token,
  //             detail: this.symbol_table[index].detail
  //           });
  //         } else {
  //           this.symbol_table.push({
  //             id: this.id++,
  //             lexema: lexema,
  //             token: "NUM",
  //             detail: ""
  //           });
  //         }
  //       } else if (this.is_valid_real(lexema)) {
  //         let element = this.already_on_symbol_table(lexema);
  //         if (element) {
  //           let index = this.symbol_table.indexOf(element);
  //           this.symbol_table.push({
  //             id: this.id++,
  //             lexema: lexema,
  //             token: this.symbol_table[index].token,
  //             detail: this.symbol_table[index].detail
  //           });
  //         } else {
  //           this.symbol_table.push({
  //             id: this.id++,
  //             lexema: lexema,
  //             token: "REAL",
  //             detail: ""
  //           });
  //         }
  //       }
  //     }
  //   }

  // already_on_reserved_stuff(lexema) {
  //   for (let element of this.reserved_stuff) {
  //     if (element.lexema === lexema) {
  //       return element;
  //     }
  //   }
  //   return false;
  // }

  // is_valid_id(lexema) {
  //   let regex = /^[a-zA-Z]([0-9]|[a-zA-Z])*$/;
  //   return regex.test(lexema);
  // }

  // is_valid_num(lexema) {
  //   let regex = /^([0-9])+$/;
  //   return regex.test(lexema);
  // }

  // is_valid_real(lexema) {
  //   let regex = /^([0-9])+.([0-9])+$/;
  //   return regex.test(lexema);
  // }

  // already_on_symbol_table(lexema) {
  //   for (let element of this.symbol_table) {
  //     if (element.lexema === lexema) {
  //       return element;
  //     }
  //   }
  //   return false;
  // }

  reset_ids() {
    for (let each of this.reserved_stuff) {
      each.ids = [];
    }
    this.symbol_table = [];
    this.error_table = [];
    this.id = 1;
  }
}
