console.log("O, A, ...");

/*-----------------------------------
DOM elements
-----------------------------------*/
const search = document.getElementById("inputSearch"); // search input
const reset = document.querySelector(".input-group-prepend"); // reset div

// console the input value
const consoleInput = (event) => {
  let input = event.target.value;
  console.log(input);
};
search.addEventListener("keyup", consoleInput);

// reset the input value
const resetInput = () => {
  const input = document.getElementById("inputSearch");
  if (input.value !== "") {
    input.value = "";
  }
};
reset.addEventListener("click", resetInput);

/*-----------------------------------
FETCH
-----------------------------------*/
