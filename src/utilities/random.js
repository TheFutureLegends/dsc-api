const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const random = {
  randomBetween,
};

export default random;
