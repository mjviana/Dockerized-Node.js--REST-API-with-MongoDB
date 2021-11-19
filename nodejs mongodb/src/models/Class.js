const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  evaluationComponents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EvaluationComponent",
    },
  ],
});

module.exports = mongoose.model("Class", ClassSchema);
