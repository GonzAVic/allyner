import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
    default: "",
  },
  options: {
    type: [String],
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
