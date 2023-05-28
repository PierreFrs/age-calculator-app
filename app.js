// import validateInput from "./utils/validateInput.js";

// select button
const btn = document.querySelector(".btn");
// select inputs
const inputs = document.querySelectorAll("input");
// select spans
const valuePlaces = document.querySelectorAll("span");

// get values of inputs as an object
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

// function to display the error messages on UI
const displayError = (inputId, text) => {
  const input = document.getElementById(inputId);
  input.classList.add("border-primaryLightRed");
  const label = input.previousElementSibling;
  label.classList.add("text-primaryLightRed");
  const errorParagraph = input.nextElementSibling;
  errorParagraph.textContent = text;
};

const validateInput = (valuesObject) => {
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

const calculateAge = (valuesObject) => {
  // get the values from the valuesObject object
  const { day, month, year } = valuesObject;
  // sets the birthdate as a date object and gets today's date
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
  const todaysDate = new Date();

  // Calculates the number of years
  const ageInMilliseconds = todaysDate - birthDate;
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  let ageYears = Math.floor(ageInMilliseconds / millisecondsPerYear);

  let ageMonths = todaysDate.getMonth() - birthDate.getMonth();
  let ageDays = todaysDate.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths -= 1;
    if ([4, 6, 9, 11].includes(Number(month))) {
      ageDays += 30;
    } else if (month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        ageDays += 29;
      } else {
        ageDays += 28;
      }
    } else {
      ageDays += 31;
    }
  }

  if (ageMonths < 0) {
    ageMonths += 12;
  }
  const age = [ageYears, ageMonths, ageDays];
  // console.log(age);
  return age;
};

// function to display the value on the UI
const displayValues = (age) => {
  valuePlaces.forEach((place, index) => {
    const placeId = `place-${index}`;
    const valuePlace = document.getElementById(placeId);
    place.textContent = age[index];
  });
};

// function to handle the click of the button
const handleClick = () => {
  // Reset input values
  inputs.forEach((input) => {
    input.classList.remove("border-primaryLightRed");
    input.previousElementSibling.classList.remove("text-primaryLightRed");
    input.nextElementSibling.textContent = "";
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

// event listener on button
btn.addEventListener("click", handleClick);

// event listener on enter key
document.addEventListener("keydown", (e) => {
  let keyCode = e.keyCode ? e.keyCode : e.which;
  if (keyCode === 13) {
    btn.click();
  }
});
