const isEmptyArray = (array) => {
  if (!Array.isArray(array) || !array.length) {
    // array does not exist, is not an array, or is empty
    // ⇒ do not attempt to process array
    return true;
  }

  return false;
};

const condition = { isEmptyArray };

export default condition;
