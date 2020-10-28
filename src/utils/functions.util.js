import moment from "moment-timezone";

const formatDate = (input) => {
  const date = moment(input)
    .tz(process.env.TIMEZONE)
    .format(process.env.TIMEZONE_FORMAT);

  return date;
};

const util = {
  formatDate,
};

export default util;
