const mongoose = require("../config/database");

module.exports = mongoose.model(
  "Contract",
  new mongoose.Schema({
    title: {
      type: String,
      require: true,
    },
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    filename: {
      type: String,
      require: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    people: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
      },
    ],
  })
);
