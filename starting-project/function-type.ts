const add = (n1: number, n2: number): number => {
  return n1 + n2;
};

const printResult = (num: number): void => {
  console.log("Result = " + num);
};

const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  // function type & callback
  const result = n1 + n2;
  cb(result);
};

printResult(add(5, 12));

let combineValues: (num1: number, num2: number) => number; // function type

combineValues = add;

console.log(combineValues(8, 8));

addAndHandle(10, 20, (result) => {
  console.log(result);
  return result;
});
