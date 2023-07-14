import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    additionalInfo: {
      type: String,
      default: "{}",
    },
    // TODO: Could we remove this frozenQuestionnaire attribute?
    frozenQuestionnaire: {
      type: String,
    },
    frozenService: {
      type: String,
      required: true,
    },
    answers: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "To do",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Business",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;

mongoose.models = {};
module.exports = mongoose.models.Order || mongoose.model("order", OrderSchema);
