// select button
const Btn = document.querySelector(".btn");
// select inputs
const inputs = document.querySelectorAll("input");
// select spans
const valueUpdates = document.querySelectorAll("span");
// select paragraphs
// const errorMessages = document.querySelectorAll(".alert");

// get values of inputs
const getValues = () => {
  const valuesObject = Array.from(inputs).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );
  if (Object.keys(valuesObject).length !== inputs.length) {
    inputs.forEach((input) => {
      if (input.value === "") {
        console.log("Field cannot be empty");
        input.nextElementSibling.textContent = "Field cannot be empty";
      }
    });
  }
  return valuesObject;
};

Btn.addEventListener("click", getValues);

// put values in span when button is clicked
// reset value in input field
// animate values from 0 to age

// Make sure day is a number between 1 and 28-29 in february, 30 31 days
// Make sure month is between 1 and 12
// make sure year is valid
// make sure date is in the future

// display error message for wrong value format
// display error for wrong date
