const mongoose = require("mongoose");

const EvaluationComponentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

module.exports = mongoose.model(
  "EvaluationComponent",
  EvaluationComponentSchema
);
