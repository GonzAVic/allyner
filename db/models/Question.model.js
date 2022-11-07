import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  sentence: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  options: {
    type: [String],
    required: false,
  },
  withDescription: {
    type: Boolean,
    required: false,
  },
  isMultiple: {
    type: Boolean,
    required: false,
  },
  isRequired: {
    type: Boolean,
    required: false,
  },
  isOriginal: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;

mongoose.models = {};
module.exports =
  mongoose.models.Question || mongoose.model("question", QuestionSchema);
