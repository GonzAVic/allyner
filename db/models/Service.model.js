import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled service",
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  callToAction: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    required: true,
    default: "coverplaceholder.com",
  },
  status: {
    type: String,
    required: true,
    default: "DRAFT",
  },

  checkoutTitle: {
    type: String,
    default: "",
  },
  checkoutMessage: {
    type: String,
    default: "",
  },
  isGuestCheckoutEnabled: {
    type: Boolean,
    required: true,
    default: false,
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
