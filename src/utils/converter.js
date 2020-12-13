import slugify from "slugify";

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

const converter = {
  converStringToSlug,
  convertDateToString,
};

export default converter;
