// import validateInput from "./utils/validateInput.js";

// select button
const Btn = document.querySelector(".btn");
// select inputs
const inputs = document.querySelectorAll("input");
// select spans
const valueUpdates = document.querySelectorAll("span");
// select form
const form = document.querySelector(".form");

// get values of inputs
const getValuesObject = () => {
  const valuesObject = Array.from(inputs).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );
  return valuesObject;
};

const displayError = (inputId, text) => {
  // Add unique IDs to each input field
  inputs.forEach((input, index) => {
    input.id = `input-${index}`;
  });
  const input = document.getElementById(inputId);
  const errorParagraph = input.nextElementSibling;
  errorParagraph.textContent = text;
};

const validateInput = (valuesObject) => {
  const { day, month, year } = valuesObject;

  let hasError = false;

  // check month length
  // check leap year for 29 days

  // check valid day
  if (!day) {
    hasError = true;
    const text = "This field is required";
    displayError("input-0", text);
  } else if (day < 1 || day > 31) {
    hasError = true;
    const text = "Must be a valid day";
    displayError("input-0", text);
  } else if ([4, 6, 9, 11].includes(Number(month)) && day > 30) {
    hasError = true;
    const text = "Must be a valid day";
    displayError("input-0", text);
  } else if (month === 2) {
    if (
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) &&
      day > 29
    ) {
      hasError = true;
      const text = "Must be a valid day";
      displayError("input-0", text);
    } else if (day > 28) {
      hasError = true;
      const text = "Must be a valid day";
      displayError("input-0", text);
    }
  }

  // check valid month
  if (!month) {
    hasError = true;
    const text = "This field is required";
    displayError("input-1", text);
  } else if (month < 1 || month > 12) {
    hasError = true;
    const text = "Must be a valid month";
    displayError("input-1", text);
  }

  // check valid year
  if (!year) {
    hasError = true;
    const text = "This field is required";
    displayError("input-2", text);
  } else if (year > new Date().getFullYear()) {
    hasError = true;
    const text = "Must be in the past";
    displayError("input-2", text);
  }
  return hasError;
};

const calculateAge = (valuesObject) => {
  const { day, month, year } = valuesObject;
  const birthDate = new Date(year, month - 1, day);
  const todaysDate = new Date();

  const ageInMilliseconds = todaysDate - birthDate;
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  let ageYears = Math.floor(ageInMilliseconds / millisecondsPerYear);

  birthDate.setFullYear(birthDate.getFullYear() + ageYears);
  let ageMonths = todaysDate.getMonth() - birthDate.getMonth();
  const ageDays = todaysDate.getDate() - birthDate.getDate();

  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }
  const age = [ageYears, ageMonths, ageDays];
  console.log(age);
  return age;
};

// put values in span when button is clicked
// reset value in input field
// animate values from 0 to age

const handleSubmit = (e) => {
  e.preventDefault();

  const valuesObject = getValuesObject();
  const hasErrors = validateInput(valuesObject);

  if (!hasErrors) {
    // Calculate age
    calculateAge(valuesObject);

    // Reset input values
    inputs.forEach((input) => {
      input.value = "";
    });
    // Proceed with form submission
  }
};

Btn.addEventListener("click", handleSubmit);
