import moment from "moment-timezone";

// @params: String
// @return: String
const formatDate = (input) => {
  const date = moment(input)
    .tz(process.env.TIMEZONE)
    .format(process.env.TIMEZONE_FORMAT);

  return date;
};

const iterateQuestionObject = (init) => {
  const result = [];

  init.forEach((value, index) => {
    // push object to q_array
    result.push({
      title: value.title,
      slug: value.slug,
      content: value.content,
      author: {
        username: value.author.username,
        avatar: value.author.avatar,
      },
      course: {
        code: value.course.code,
        name: value.course.name,
      },
      createdAt: util.formatDate(value.createdAt),
    });
  });

  return result;
};

// @params: Array of Object
// @return: Array
const iteratePostAndEventObject = (init) => {
  const result = [];

  init.forEach((value, index) => {
    result.push({
      title: value.title,
      slug: value.slug,
      description: value.description,
      visit: value.visit,
      image: value.image,
      category: {
        title: value.category.title,
        slug: value.category.slug,
      },
      author: {
        username: value.author.username,
        avatar: value.author.avatar,
      },
      createdAt: formatDate(value.createdAt),
      // updatedAt: formatDate(value.updatedAt),
    });
  });

  return result;
};

const getObject = (value) => {
  return {
    title: value.title,
    slug: value.slug,
    description: value.description,
    visit: value.visit,
    image: value.image,
    category: {
      title: value.category.title,
      slug: value.category.slug,
    },
    author: {
      username: value.author.username,
      avatar: value.author.avatar,
    },
    createdAt: formatDate(value.createdAt),
    // updatedAt: formatDate(value.updatedAt),
  };
};

const util = {
  formatDate,
  iterateQuestionObject,
  iteratePostAndEventObject,
  getObject,
};

export default util;
