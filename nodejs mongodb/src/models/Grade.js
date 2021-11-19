const mongoose = require("mongoose");

const GradeSchema = mongoose.Schema({
  value: Number,
  evaluationComponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EvaluationComponent",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("Grade", GradeSchema);
