import express from "express";

import {
  getAllEvents,
  getEvent,
} from "../src/controllers/events/event.controller.js";

const router = express.Router();

router.get("/", getAllEvents);

// This will go last
router.get("/:slug", getEvent);

export default router;
