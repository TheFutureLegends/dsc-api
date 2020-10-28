import slugify from "slugify";
import moment from "moment-timezone";

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

    const e_array = util.iterateObject(events);

    for (let index = 0; index < e_array.length; index++) {
      const element = e_array[index];

      element.startAt = moment(events[index].startAt)
        .tz(process.env.TIMEZONE)
        .format(process.env.TIMEZONE_FORMAT + " HH:mm:ss");

      element.endAt = moment(events[index].endAt)
        .tz(process.env.TIMEZONE)
        .format(process.env.TIMEZONE_FORMAT + " HH:mm:ss");
    }

    return res.json({
      events: e_array,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error: ", error.message);

    return res.status(500).send({ message: error });
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
        startAt: util.formatDate(value.startAt),
        endAt: util.formatDate(value.endAt),
        createdAt: util.formatDate(value.createdAt),
      };

      return res.status(200).send({ event });
    });
};

// Below functions are required with role moderator
const displayEvent = async (req, res) => {
  Event.find({
    author: req.userId,
  }).exec((err, events) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).send({ message: err });
    }

    const e_array = util.iterateObject(events);

    for (let index = 0; index < e_array.length; index++) {
      const element = e_array[index];

      element.startAt = moment(events[index].startAt)
        .tz(process.env.TIMEZONE)
        .format(process.env.TIMEZONE_FORMAT + " HH:mm:ss");

      element.endAt = moment(events[index].endAt)
        .tz(process.env.TIMEZONE)
        .format(process.env.TIMEZONE_FORMAT + " HH:mm:ss");
    }

    return res.status(200).send({ events: e_array });
  });
};

const showEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      slug: req.params.slug,
      author: req.userId,
    })
      .populate("category")
      .exec();

    return res.status(200).json({
      event,
    });
  } catch (error) {
    console.error("Error: ", error.message);

    return res.status(500).send({ message: error });
  }
};

export { getAllEvents, getEvent, displayEvent, showEvent };
