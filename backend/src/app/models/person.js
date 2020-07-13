const mongoose = require("../config/database");

module.exports = mongoose.model(
  "Person",
  new mongoose.Schema({
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    cpf: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  })
);
