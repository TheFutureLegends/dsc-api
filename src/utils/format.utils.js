import moment from "moment-timezone";

const date = (input) => {
  const date = moment(input)
    .tz(process.env.TIMEZONE)
    .format(process.env.TIMEZONE_FORMAT);

  return date;
};

const format = {
  date,
};

export default format;
