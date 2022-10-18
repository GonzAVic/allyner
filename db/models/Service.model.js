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
  isOriginal: {
    type: Boolean,
    required: true,
    default: false,
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.Service || mongoose.model("service", ServiceSchema);
