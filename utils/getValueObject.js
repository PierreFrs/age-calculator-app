// get values of inputs as an object
const getValuesObject = (inputs) => {
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

export default getValuesObject;
