// import validateInput from "./utils/validateInput.js";

// select button
const Btn = document.querySelector(".btn");
// select inputs
const inputs = document.querySelectorAll("input");
// select spans
const valuePlaces = document.querySelectorAll("span");
// select form
const form = document.querySelector(".form");

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

// get values of inputs
const getValuesObject = () => {
  const valuesObject = Array.from(inputs).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );
  // console.log(valuesObject);
  return valuesObject;
};

const displayError = (inputId, text) => {
  const input = document.getElementById(inputId);
  input.classList.add("border-primaryLightRed");
  const errorParagraph = input.nextElementSibling;
  errorParagraph.textContent = text;
};

const validateInput = (valuesObject) => {
  const { day, month, year } = valuesObject;

  let hasError = false;

  // check valid day
  if (!day) {
    hasError = true;
    const text = "This field is required";
    displayError(day, text);
  } else if (day < 1 || day > 31) {
    hasError = true;
    const text = "Must be a valid day";
    displayError(day, text);
  } else if ([4, 6, 9, 11].includes(Number(month)) && day > 30) {
    hasError = true;
    const text = "Must be a valid day";
    displayError(day, text);
  } else if (month === 2) {
    if (
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) &&
      day > 29
    ) {
      hasError = true;
      const text = "Must be a valid day";
      displayError(day, text);
    } else if (day > 28) {
      hasError = true;
      const text = "Must be a valid day";
      displayError(day, text);
    }
  }

  // check valid month
  if (!month) {
    hasError = true;
    const text = "This field is required";
    displayError(month, text);
  } else if (month < 1 || month > 12) {
    hasError = true;
    const text = "Must be a valid month";
    displayError(month, text);
  }

  // check valid year
  if (!year) {
    hasError = true;
    const text = "This field is required";
    displayError(year, text);
  } else if (year > new Date().getFullYear()) {
    hasError = true;
    const text = "Must be in the past";
    displayError(year, text);
  }
  // console.log(hasError);
  return hasError;
};

const calculateAge = (valuesObject) => {
  const { day, month, year } = valuesObject;
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
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
  // console.log(age);
  return age;
};

const displayValues = (age) => {
  valuePlaces.forEach((place, index) => {
    const placeId = `place-${index}`;
    const valuePlace = document.getElementById(placeId);
    place.textContent = age[index];
  });
};

const handleClick = () => {
  // Reset input values
  inputs.forEach((input) => {
    input.classList.remove("border-primaryLightRed");
  });

  // Get input values
  const valuesObject = getValuesObject();

  // validate input values
  let hasError = validateInput(valuesObject);

  if (!hasError) {
    // Calculate age
    const age = calculateAge(valuesObject);
    // Display values
    displayValues(age);
    // Reset input values
    inputs.forEach((input) => {
      input.value = "";
    });
  }
};

Btn.addEventListener("click", handleClick);
