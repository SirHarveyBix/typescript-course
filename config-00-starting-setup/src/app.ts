// const button = document.querySelector("button")!; // " ! " means : wait, i know it might be null, then if check is unnecessary
const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", () => {
    console.log("Clicked !");
  });
}
