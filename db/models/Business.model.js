import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  industry: {
    type: String,
  },
  additionalData: {
    type: String,
    required: true,
    default: "{}",
  },

  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
});

const Business = mongoose.model("business", BusinessSchema);
module.exports = Business;

mongoose.models = {};
module.exports =
  mongoose.models.Business || mongoose.model("business", BusinessSchema);
