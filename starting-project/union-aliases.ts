type Combinable = number | string;
type ConversionDefinition = "as-number" | "as-text";

const combine = (
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDefinition
) => {
  let result: number | string;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = Number(input1) + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
};

const combinedAges = combine("30", "26", "as-number");
console.log("combinedAges", combinedAges);

const combinedNames = combine("Anton", "Henrietta", "as-text");
console.log("combinedNames", combinedNames);
