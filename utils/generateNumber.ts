const generateRandomNumbers = (
  min: number,
  max: number,
  exclude: number
): never | number => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomNumbers(min, max, exclude);
  } else {
    return randomNumber;
  }
};

export { generateRandomNumbers };
