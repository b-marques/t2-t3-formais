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
      { lexema: "*", token: "ARITOP", detail: "Multiplication" },
      { lexema: "/", token: "ARITOP", detail: "Division" },
      { lexema: "+", token: "ARITOP", detail: "Addition" },
      { lexema: "-", token: "ARITOP", detail: "Subtraction" },
      { lexema: ";", token: "PUNCTUATION", detail: "Semicolon" },
      { lexema: "(", token: "PUNCTUATION", detail: "Left parenthesis" },
      { lexema: ")", token: "PUNCTUATION", detail: "Right parenthesis" },
      { lexema: "{", token: "PUNCTUATION", detail: "Left Brace" },
      { lexema: "}", token: "PUNCTUATION", detail: "Right Brace" },
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
  }

  processInput(input) {
    this.reset_ids();

    this.input = input;
    // Prepare to analysis, managing whitespaces
    let splitted_input = input.replace(/[ \t\r\n]+/g, " ");
    splitted_input = splitted_input.replace(/;/g, " ; ");
    splitted_input = splitted_input.replace(/\(/g, " ( ");
    splitted_input = splitted_input.replace(/\)/g, " ) ");
    splitted_input = splitted_input.replace(/\{/g, " { ");
    splitted_input = splitted_input.replace(/\}/g, " } ");

    // Split by whitespace to read lexeme
    splitted_input = splitted_input.split(" ");

    for (let lexema of splitted_input) {
      // Check if is reserved word or special character
      let element = this.already_on_reserved_stuff(lexema);
      if (element) {
        let index = this.reserved_stuff.indexOf(element);
        this.symbol_table.push({
          id: this.id++,
          lexema: lexema,
          token: this.reserved_stuff[index].token,
          detail: this.reserved_stuff[index].detail
        });
      } else if (this.is_valid_id(lexema)) {
        let element = this.already_on_symbol_table(lexema);
        if (element) {
          let index = this.symbol_table.indexOf(element);
          this.symbol_table.push({
            id: this.id++,
            lexema: lexema,
            token: this.symbol_table[index].token,
            detail: this.symbol_table[index].detail
          });
        } else {
          this.symbol_table.push({
            id: this.id++,
            lexema: lexema,
            token: "ID",
            detail: ""
          });
        }
      } else if (this.is_valid_num(lexema)) {
        let element = this.already_on_symbol_table(lexema);
        if (element) {
          let index = this.symbol_table.indexOf(element);
          this.symbol_table.push({
            id: this.id++,
            lexema: lexema,
            token: this.symbol_table[index].token,
            detail: this.symbol_table[index].detail
          });
        } else {
          this.symbol_table.push({
            id: this.id++,
            lexema: lexema,
            token: "NUM",
            detail: ""
          });
        }
      } else if (this.is_valid_real(lexema)) {
        let element = this.already_on_symbol_table(lexema);
        if (element) {
          let index = this.symbol_table.indexOf(element);
          this.symbol_table.push({
            id: this.id++,
            lexema: lexema,
            token: this.symbol_table[index].token,
            detail: this.symbol_table[index].detail
          });
        } else {
          this.symbol_table.push({
            id: this.id++,
            lexema: lexema,
            token: "REAL",
            detail: ""
          });
        }
      }
    }
  }

  already_on_reserved_stuff(lexema) {
    for (let element of this.reserved_stuff) {
      if (element.lexema === lexema) {
        return element;
      }
    }
    return false;
  }

  is_valid_id(lexema) {
    let regex = /^[a-zA-Z]([0-9]|[a-zA-Z])*$/;
    return regex.test(lexema);
  }

  is_valid_num(lexema) {
    let regex = /^([0-9])+$/;
    return regex.test(lexema);
  }

  is_valid_real(lexema) {
    let regex = /^([0-9])+.([0-9])+$/;
    return regex.test(lexema);
  }

  already_on_symbol_table(lexema) {
    for (let element of this.symbol_table) {
      if (element.lexema === lexema) {
        return element;
      }
    }
    return false;
  }

  reset_ids() {
    for (let each of this.reserved_stuff) {
      each.ids = [];
    }
    this.symbol_table = [];
    this.id = 1;
  }
}
