// Function to display the age values in the UI with an animation
const updateCount = (el) => {
  const value = parseInt(el.id);
  const increment = Math.ceil(value / 1000);
  let initialValue = 0;

  const increaseCount = setInterval(() => {
    initialValue += increment;

    if (initialValue > value) {
      el.textContent = value;
      clearInterval(increaseCount);
      return;
    }

    el.textContent = initialValue;
  }, 1);
  // console.log(increaseCount);
};

export default updateCount;
