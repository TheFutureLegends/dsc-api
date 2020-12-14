import slugify from "slugify";
import moment from "moment-timezone";

/**
 *
 * @param {String} input
 * @return {String} slug
 */
const converStringToSlug = (input) => {
  return slugify(input.toLowerCase());
};

/**
 *
 * @param {DateTime} input
 * @return {String} date
 */
const convertDateToString = (input) => {
  const date = moment(input)
    .tz(process.env.TIMEZONE)
    .format(process.env.TIMEZONE_FORMAT);

  return date;
};

/**
 *
 * @param {String} input
 * @return {Number} x
 */
const convertStringToNumber = (input) => {
  let x = Number(input);
  return x >= 0 ? Math.floor(x) : Math.ceil(x);
};

const converter = {
  converStringToSlug,
  convertDateToString,
  convertStringToNumber,
};

export default converter;
