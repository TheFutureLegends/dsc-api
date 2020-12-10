const dbConfig = () => {
  let DB_URI = "";

  switch (process.env.NODE_ENV) {
    case "test":
      DB_URI = `${process.env.TESTING_DB_URI}`;
      break;

    default:
      DB_URI = `${process.env.PRODUCTION_DB_URI}`;
      break;
  }

  return DB_URI;
};

export default dbConfig;
