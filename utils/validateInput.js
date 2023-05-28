import displayError from "./displayError.js";

const validateInput = (valuesObject, inputs) => {
  // get the values from the valuesObject object
  const { day, month, year } = valuesObject;

  // Add unique IDs to each input field
  inputs.forEach((input, index) => {
    if (index === 0) {
      input.id = "day";
    } else if (index === 1) {
      input.id = "month";
    } else if (index === 2) {
      input.id = "year";
    }
  });

  // sets the error as false by default
  let hasError = false;

  // check valid day
  if (!day) {
    hasError = true;
    const text = "This field is required";
    displayError("day", text);
  } else if (day < 1 || day > 31) {
    hasError = true;
    const text = "Must be a valid day";
    displayError("day", text);
  } else if ([4, 6, 9, 11].includes(Number(month)) && day > 30) {
    hasError = true;
    const text = "Must be a valid day";
    displayError("day", text);
  } else if (month === 2) {
    if (
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) &&
      day > 29
    ) {
      hasError = true;
      const text = "Must be a valid day";
      displayError("day", text);
    } else if (day > 28) {
      hasError = true;
      const text = "Must be a valid day";
      displayError("day", text);
    }
  }

  // check valid month
  if (!month) {
    hasError = true;
    const text = "This field is required";
    displayError("month", text);
  } else if (month < 1 || month > 12) {
    hasError = true;
    const text = "Must be a valid month";
    displayError("month", text);
  }

  // check valid year
  if (!year) {
    hasError = true;
    const text = "This field is required";
    displayError("year", text);
  } else if (year > new Date().getFullYear()) {
    hasError = true;
    const text = "Must be in the past";
    displayError("year", text);
  }
  // console.log(hasError);
  return hasError;
};

export default validateInput;
