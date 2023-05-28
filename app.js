import getValuesObject from "./utils/getValueObject.js";
import validateInput from "./utils/validateInput.js";
import calculateAge from "./utils/calculateAge.js";
import updateCount from "./utils/updateCount.js";

// select button
const btn = document.querySelector(".btn");
// select inputs
const inputs = document.querySelectorAll("input");
// select spans
const valuePlaces = document.querySelectorAll("span");

// function to handle the click of the button
const handleClick = () => {
  // Reset input values
  inputs.forEach((input) => {
    input.classList.remove("border-primaryLightRed");
    input.previousElementSibling.classList.remove("text-primaryLightRed");
    input.nextElementSibling.textContent = "";
  });

  // Get input values
  const valuesObject = getValuesObject(inputs);

  // validate input values
  let hasError = validateInput(valuesObject, inputs);

  if (!hasError) {
    // Calculate age
    const age = calculateAge(valuesObject, valuePlaces);

    // updates the age values in the UI with animation
    valuePlaces.forEach((item) => {
      updateCount(item);
    });
    // Reset input values
    inputs.forEach((input) => {
      input.value = "";
    });
  }
};

// event listener on button
btn.addEventListener("click", handleClick);

// event listener on enter key
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
