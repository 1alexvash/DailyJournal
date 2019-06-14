const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Record = require("../../models/Record");

const moment = require("moment");

// @route    POST api/records
// @desc     Add new record
// @access   Private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const record = new Record({
      author: user._id,
      listOfQuestions: req.body
    });

    await record.save();
    res.send(record);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/records/:recordId
// @desc     Delete a record
// @access   Private
router.delete("/:recordId", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const record = await Record.findOne({ _id: req.params.recordId });

    if (user._id.toString() === record.author.toString()) {
      record.remove();
      res.status(200).send(record);
    } else {
      res.status(400).send("Not authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/records/check-if-fillled
// @desc     Check is the journal is filled to today
// @access   Private
router.get("/check-if-fillled", auth, async (req, res) => {
  try {
    const date = moment().format("MMMM Do YYYY");
    const records = await Record.find({ author: req.user.id, date: date });
    res.send(records.length > 0);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/records
// @desc     Get records
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const records = await Record.find({ author: req.user.id });
    res.send(records);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
