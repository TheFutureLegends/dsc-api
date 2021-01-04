const randomBetweenInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const random = {
  randomBetweenInclusive,
};

export default random;
