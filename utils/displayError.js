// function to display the error messages on UI
const displayError = (inputId, text) => {
  const input = document.getElementById(inputId);
  input.classList.add("border-primaryLightRed");
  const label = input.previousElementSibling;
  label.classList.add("text-primaryLightRed");
  const errorParagraph = input.nextElementSibling;
  errorParagraph.textContent = text;
};

export default displayError;
