const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
});

module.exports = mongoose.model("Course", CourseSchema);
