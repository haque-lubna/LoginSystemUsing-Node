const mongoose = require("mongoose");

const { Schema } = mongoose; // eslint-disable-line new-cap

const userSchema = new Schema(
  {
    email: String,
    password: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
