const validateInput = (date) => {
  const { day, month, year } = date;

  let errors = { day: "", month: "", year: "" };
  let isError = false;

  // check month length
  // check leap year for 29 days

  // check valid day
  if (!day) {
    isError = true;
    errors.day = "This field is required";
  } else if (day < 1 || day > 31) {
    isError = true;
    errors.day = "Must be a valid day";
  } else if ([4, 6, 9, 11].includes(Number(month)) && day > 30) {
    isError = true;
    errors.day = "Must be a valid day";
  } else if (month === 2) {
    if (
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) &&
      day > 29
    ) {
      isError = true;
      errors.day = "Must be a valid day";
    } else if (day > 28) {
      isError = true;
      errors.day = "Must be a valid day";
    }
  }

  // check valid month
  if (!month) {
    isError = true;
    errors.month = "This field is required";
  } else if (month < 1 || month > 12) {
    isError = true;
    errors.month = "Must be a valid month";
  }

  // check valid year
  if (!year) {
    isError = true;
    errors.year = "This field is required";
  } else if (year > new Date().getFullYear()) {
    isError = true;
    errors.year = "must be in the past";
  }

  return { isError, errors };
};

export default validateInput;
