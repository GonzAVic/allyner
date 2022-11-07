import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  callToAction: {
    type: String,
    default: "LALALA",
  },
  cover: {
    type: String,
    required: true,
    default: "coverplaceholder.com",
  },
  status: {
    type: String,
    required: true,
    default: "UNPUBLISHED",
  },
  isOriginal: {
    type: Boolean,
    required: true,
    default: false,
  },
  pricing: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Pricing",
  },
  questionnaire: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [],
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.Service || mongoose.model("service", ServiceSchema);
