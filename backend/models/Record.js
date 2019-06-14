const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const RecordSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "usersa"
  },
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY"),
    required: true
  },
  listOfQuestions: {
    type: ["Mixed"],
    required: true
  }
});

module.exports = Record = mongoose.model("record", RecordSchema);
