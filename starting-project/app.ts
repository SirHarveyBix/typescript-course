let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Gui";

if (typeof userInput === "string") userName = userInput;

const generateError = (message: string, code: number): never => {
  // it'll NEVER return anything
  throw { message: message, errorCode: code };
  // throw will crash the script
};

const result = generateError("Error, Error, Bro !", 500);

console.log(result);

// typescript doc : https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
