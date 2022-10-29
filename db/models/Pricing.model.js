import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  durationMinutes: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isOriginal: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Pricing = mongoose.model("pricing", PricingSchema);
module.exports = Pricing;

mongoose.models = {};
module.exports =
  mongoose.models.Pricing || mongoose.model("pricing", PricingSchema);
