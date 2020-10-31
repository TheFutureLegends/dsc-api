import slugify from "slugify";
import moment from "moment-timezone";

import db from "../../models/index.js";
import validationRules from "../../validations/index.js";
import middleware from "../../middleware/index.js";
import util from "../../utils/functions.util.js";
import Category from "../../models/category.model.js";

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

      const event = util.getObject(value);

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

const createEvent = async (req, res) => {
  // Validate input
  const { error } = validationRules.postValidation.postSchema.validate(
    req.body
  );

  if (error) return res.status(400).send(error.details[0].message);

  // Add to model
  const event = new Event({
    title: req.body.title,
    slug: slugify(req.body.title.toLowerCase()),
    description: req.body.description,
  });

  const category = await Category.findOne({
    slug: req.body.category,
  }).exec();

  event.category = category._id;

  const author = await User.findById(req.userId).exec();

  event.author = author._id;
};

export { getAllEvents, getEvent, displayEvent, showEvent };
