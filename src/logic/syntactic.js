export default class Syntactic {
  constructor() {
    this.T = new Set([
      "id",
      "while",
      "do",
      "break",
      "if",
      "then",
      "else",
      "true",
      "false",
      "basic",
      "num",
      "real",
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
      "==",
      "!=",
      "&&",
      "||",
      "!",
      "="
    ]);
    this.N = new Set([
      "<program>",
      "<block>",
      "<decls>",
      "<decl>",
      "<type>",
      "<types>",
      "<stmts>",
      "<stmt>",
      "<openif>",
      "<loc>",
      "<locs>",
      "<bool>",
      "<boolx>",
      "<join>",
      "<joinx>",
      "<equality>",
      "<equalityx>",
      "<rel>",
      "<relx>",
      "<expr>",
      "<exprs>",
      "<term>",
      "<terms>",
      "<unary>",
      "<factor>"
    ]);
    this.P = [
      {
        head: "<program>",
        prods: [["<block>"]]
      },
      {
        head: "<block>",
        prods: [["{", "<decls>", "<stmts>", "}"]]
      },
      {
        head: "<decls>",
        prods: [["&"], ["<decl>", "<decls>"]]
      },
      {
        head: "<decl>",
        prods: [["<type>", "id", ";"]]
      },
      {
        head: "<type>",
        prods: [["basic", "<types>"]]
      },
      {
        head: "<types>",
        prods: [["&"], ["[", "num", "]", "<types>"]]
      },
      {
        head: "<stmts>",
        prods: [["&"], ["<stmt>", "<stmts>"]]
      },
      {
        head: "<stmt>",
        prods: [
          ["<loc>", "=", "<bool>", ";"],
          ["<openif>"],
          ["while", "(", "<bool>", ")", "<stmt>"],
          ["do", "<stmt>", "while", "(", "<bool>", ")", ";"],
          ["break", ";"],
          ["<block>"]
        ]
      },
      {
        head: "<openif>",
        prods: [["if", "(", "<bool>", ")", "then", "<stmt>", "else", "<stmt>"]]
      },
      {
        head: "<loc>",
        prods: [["id", "<locs>"]]
      },
      {
        head: "<locs>",
        prods: [["[", "<bool>", "]", "<locs>"], ["&"]]
      },
      {
        head: "<bool>",
        prods: [["<join>", "<boolx>"]]
      },
      {
        head: "<boolx>",
        prods: [["||", "<bool>"], ["&"]]
      },
      {
        head: "<join>",
        prods: [["<equality>", "<joinx>"]]
      },
      {
        head: "<joinx>",
        prods: [["&&", "<join>"], ["&"]]
      },
      {
        head: "<equality>",
        prods: [["<rel>", "<equalityx>"]]
      },
      {
        head: "<equalityx>",
        prods: [["&"], ["!=", "<equality>"], ["==", "<equality>"]]
      },
      {
        head: "<rel>",
        prods: [["<expr>", "<relx>"]]
      },
      {
        head: "<relx>",
        prods: [
          ["<", "<expr>"],
          ["<=", "<expr>"],
          [">", "<expr>"],
          [">=", "<expr>"],
          ["&"]
        ]
      },
      {
        head: "<expr>",
        prods: [["<term>", "<exprs>"]]
      },
      {
        head: "<exprs>",
        prods: [["+", "<term>", "<exprs>"], ["-", "<term>", "<exprs>"], ["&"]]
      },
      {
        head: "<term>",
        prods: [["<unary>", "<terms>"]]
      },
      {
        head: "<terms>",
        prods: [["*", "<unary>", "<terms>"], ["/", "<unary>", "<terms>"], ["&"]]
      },
      {
        head: "<unary>",
        prods: [["!", "<unary>"], ["-", "<unary>"], ["<factor>"]]
      },
      {
        head: "<factor>",
        prods: [
          ["(", "<bool>", ")"],
          ["<loc>"],
          ["num"],
          ["real"],
          ["true"],
          ["false"]
        ]
      }
    ];
    this.S = "<program>";
    this.first = [];
    this.follow = [];

    for (let each of this.N) {
      this.first[each] = new Set();
      this.follow[each] = new Set();
    }

    for (let head of this.N) {
      this.compute_first_set(head);
    }

    this.compute_follow_set();

    this.parsing_table = [];
    this.build_parsing_table();
    this.stack = [];
    this.result = [{ message: "", line_number: "" }];
  }

  compute_first_set(head) {
    let rule = this.P.filter(prod => prod.head === head);
    for (let production of rule[0].prods) {
      // If is a terminal add to first set of head
      if (this.T.has(production[0]) || production[0] === "&") {
        this.first[head].add(production[0]);
      } else {
        if (this.first[production[0]].size !== 0) {
          for (let each of this.first[production[0]]) {
            this.first[head].add(each);
          }
        } else {
          this.compute_first_set(production[0]);
          this.compute_first_set(head);
        }
      }
    }
  }
  compute_follow_set() {
    // 1 – Se A é o símbolo inicial da gramática -> $ ∈ Follow(A)
    this.follow[this.S].add("$");

    let loops = 0;
    do {
      let old_follow = [];
      for (let each of this.N) {
        old_follow[each] = new Set([...this.follow[each]]);
      }

      for (let A of this.N) {
        let rule = this.P.filter(prod => prod.head === A);
        for (let production of rule[0].prods) {
          for (const [i, element] of production.entries()) {
            let B = element;
            let Beta = new Set();
            let index = i + 1;
            while (production[index] !== undefined) {
              Beta.add(production[index]);
              index++;
            }
            let BetaFirst = Beta.size > 0 ? this.get_first(Beta) : new Set();

            // 2 – Se A -> α B β ∈ P ∧ β ≠ ε -> adicione first(β) em Follow(B)
            if (loops === 0) {
              if (this.N.has(B) && (Beta.size > 0 && [...Beta][0] !== "&")) {
                for (let each of BetaFirst) {
                  this.follow[B].add(each);
                }
                this.follow[B].delete("&");
              }
            }

            // 3 – Se A -> αB (ou A->αBβ, onde ε ∈ First(β)) ∈ P -> adicione Follow(A) em Follow(B)
            if (this.N.has(B) && (Beta.size === 0 || BetaFirst.has("&"))) {
              for (let follow of this.follow[A]) {
                this.follow[B].add(follow);
              }
              this.follow[B].delete("&");
            }
          }
        }
      }

      loops++;

      if (!this.follow_has_changed(old_follow)) break;
    } while (true);
  }

  get_first(Beta) {
    if (this.T.has([...Beta][0])) {
      return new Set([[...Beta][0]]);
    }
    let FirstBeta = new Set();
    let i = 0;
    while ([...Beta][i] !== undefined) {
      if (this.T.has([...Beta][i])) {
        FirstBeta.add([...Beta][i]);
        FirstBeta.delete("&");
        return FirstBeta;
      }
      for (let each of this.first[[...Beta][i]]) {
        FirstBeta.add(each);
      }
      if (!this.first[[...Beta][i]].has("&")) {
        FirstBeta.delete("&");
        return FirstBeta;
      }
      i++;
    }
    return FirstBeta;
  }

  equal_sets(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
  }

  follow_has_changed(old_follow) {
    for (let each of this.N) {
      if (!this.equal_sets(old_follow[each], this.follow[each])) {
        return true;
      }
    }
    return false;
  }

  build_parsing_table() {
    for (let A of this.N) {
      this.parsing_table[A] = [];
      for (let b of this.T) {
        this.parsing_table[A][b] = { prod: ["<erro>"] };
      }
      this.parsing_table[A]["$"] = { prod: ["<erro>"] };
    }
    for (let A of this.N) {
      for (let a of this.first[A]) {
        if (a === "&") {
          for (let b of this.follow[A]) {
            this.parsing_table[A][b].prod = ["ε"];
          }
        } else {
          let rule = this.P.filter(prod => prod.head === A);
          for (let production of rule[0].prods) {
            if (production[0] === a) {
              this.parsing_table[A][a].prod = production;
            } else if (this.N.has(production[0])) {
              for (let each of this.first[production[0]]) {
                if (each !== "&") {
                  if (this.parsing_table[A][each].prod.includes("<erro>")) {
                    this.parsing_table[A][each].prod = production;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  analysis(symbol_table) {
    console.clear();
    console.log(this.parsing_table);
    if (!symbol_table.length) {
      this.result[0].message = "Empty symbol table!";
      this.result[0].line_number = "";
      return;
    }
    this.result = [{ message: "", line_number: "" }];
    this.stack = ["$", "<program>"];
    symbol_table.push({
      id: symbol_table[symbol_table.length - 1].id + 1,
      token: "END",
      lexema: "$",
      detail: "",
      line: symbol_table[symbol_table.length - 1].line_number
    });

    while (symbol_table.length > 0) {
      console.log(this.stack);

      let stack_symbol = this.stack.pop();
      if (stack_symbol === "ε") {
        continue;
      }

      let input_element = symbol_table.shift();

      if (stack_symbol === "$" && symbol_table.length) {
        this.result[0].message = "Syntactic error!";
        this.result[0].line_number = input_element.line;
        return;
      }

      switch (input_element.token) {
        case "ID":
          input_element.lexema = "id";
          break;
        case "NUM":
          input_element.lexema = "num";
          break;
        case "REAL":
          input_element.lexema = "real";
          break;
        default:
          break;
      }

      if (input_element.lexema === stack_symbol) {
        continue;
      }
      if (
        this.parsing_table[stack_symbol][input_element.lexema].prod.includes(
          "<erro>"
        )
      ) {
        this.result[0].message = "Syntactic error!";
        this.result[0].line_number = input_element.line;
        return;
      } else {
        symbol_table.unshift(input_element);

        let items = this.parsing_table[stack_symbol][input_element.lexema].prod;
        let i = items.length;
        while (i--) {
          this.stack.push(items[i]);
        }
      }
    }
    this.result[0].message = "Success!";
    this.result[0].line_number = "";
    return;
  }
}
