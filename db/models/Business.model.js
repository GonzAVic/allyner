import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    currency: {
      type: String,
    },
    timezone: {
      type: String,
    },
    industry: {
      type: String,
      required: true,
    },
    subdomain: {
      type: String,
    },
    additionalData: {
      type: String,
      required: true,
      default: "{}",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
module.exports =
  mongoose.models.Business || mongoose.model("business", BusinessSchema);
