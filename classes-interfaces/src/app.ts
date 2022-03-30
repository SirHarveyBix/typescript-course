interface AddFunction {
  (a: number, b: number): number;
}
// type AddFunction = (a: number, b: number) => number;

let add: AddFunction;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;
  constructor(n?: string) {
    if (n) this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase, " ", this.name);
  }
}

let user1: Greetable;

user1 = new Person("Gui");

user1.greet("Hello World, i am :");

console.log(user1);
