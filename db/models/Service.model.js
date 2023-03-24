import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Business",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  cover: {
    type: String,
  },
  callToAction: {
    type: String,
  },
  status: {
    type: String,
  },

  questionList: {
    type: String,
    required: true,
    default: "[]",
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.Service || mongoose.model("service", ServiceSchema);
