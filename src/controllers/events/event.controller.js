import slugify from "slugify";

import db from "../../models/index.js";
import validationRules from "../../validations/index.js";
import middleware from "../../middleware/index.js";
import util from "../../utils/functions.util.js";

const User = db.user;

const Event = db.event;

const getAllEvents = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  try {
    const events = await Event.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate(["category", "author"])
      .exec();

    const count = await Event.countDocuments();

    const e_array = [];

    events.forEach((value, index) => {
      e_array.push({
        title: value.title,
        slug: value.slug,
        description: value.description,
        image: value.image,
        visit: value.visit,
        category: {
          title: value.category.title,
          slug: value.category.slug,
        },
        author: {
          username: value.author.username,
          avatar: value.author.avatar,
        },
        createdAt: util.formatDate(value.createdAt),
        updatedAt: util.formatDate(value.updatedAt),
      });
    });

    return res.json({
      events: e_array,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error: ", err.message);

    return res.status(500).send({ message: err });
  }
};

const getEvent = async (req, res) => {
  Event.findOne({
    slug: req.params.slug,
  })
    .populate(["category", "author"])
    .exec((err, value) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      const event = {
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
        createdAt: util.formatDate(value.createdAt),
        updatedAt: util.formatDate(value.updatedAt),
      };

      return res.status(200).send({ event });
    });
};

// Below functions are required with role moderator
const displayEvent = async (req, res) => {
  Event.find({
    author: {
      _id: req.userId,
    },
  }).exec((err, events) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).send({ message: err });
    }

    const e_array = [];

    events.forEach((value, index) => {
      e_array.push({
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
        createdAt: util.formatDate(value.createdAt),
        updatedAt: util.formatDate(value.updatedAt),
      });
    });

    return res.status(200).send({ events: e_array });
  });
};

export { getAllEvents, getEvent, displayEvent };
