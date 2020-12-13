const isEmptyArray = (array) => {
  if (!Array.isArray(array) || !array.length) {
    // array does not exist, is not an array, or is empty
    // ⇒ do not attempt to process array
    return true;
  }

  return false;
};

const isEmptyObject = (object) => {};

const condition = { isEmptyArray, isEmptyObject };

export default condition;
