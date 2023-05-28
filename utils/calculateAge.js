const calculateAge = (valuesObject, valuePlaces) => {
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

  // add an id to the valuePlaces corresponding to each age value
  valuePlaces.forEach((place, index) => {
    place.id = age[index];
  });
  return age;
};

export default calculateAge;
