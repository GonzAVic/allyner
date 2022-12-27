import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Business = mongoose.model("business", BusinessSchema);
module.exports = Business;

mongoose.models = {};
module.exports =
  mongoose.models.Business || mongoose.model("business", BusinessSchema);
