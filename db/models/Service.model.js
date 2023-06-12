import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Business",
    },
    name: {
      type: String,
    },
    cover: {
      type: String,
    },
    description: {
      type: String,
    },
    callToAction: {
      type: String,
    },
    pricingAmount: {
      type: Number,
    },
    pricingDuration: {
      type: Number,
    },
    pricingType: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },

    questionnaire: {
      type: String,
      required: true,
      default: "[]",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
module.exports =
  mongoose.models.Service || mongoose.model("service", ServiceSchema);
