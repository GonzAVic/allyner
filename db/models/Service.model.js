import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  callToAction: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
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
});

mongoose.models = {};
module.exports =
  mongoose.models.Service || mongoose.model("service", ServiceSchema);
