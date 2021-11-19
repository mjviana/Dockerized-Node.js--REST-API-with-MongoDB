const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  notes: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  grades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
  ],
});

module.exports = mongoose.model("Student", StudentSchema);
