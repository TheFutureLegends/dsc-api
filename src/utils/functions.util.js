import express from "express";
import moment from "moment-timezone";
import db from "../models/index.js";

const Answer = db.answer;

// @params: String
// @return: String
const formatDate = (input) => {
  const date = moment(input)
    .tz(process.env.TIMEZONE)
    .format(process.env.TIMEZONE_FORMAT);

  return date;
};

const iterateQuestionObject = (init) => {
  const answer_array = [];

  const result = [];

  init.forEach((value, index) => {
    const answers = value.answers;

    answers.forEach((answer, index) => {
      answer_array.push({
        id: answer._id,
        content: answer.content,
        status: answer.status,
        author: {
          username: answer.author.username,
          avatar: answer.author.avatar,
        },
        createdAt: util.formatDate(answer.createdAt),
      });
    });

    result.push({
      id: value._id,
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
      answers: answer_array,
      status: value.status,
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
