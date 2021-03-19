const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      trim: true,
      required: "Task is required",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cruds", crudSchema);
