import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    additionalInfo: {
      type: String,
      default: "{}",
      required: true,
    },
    userType: {
      type: String,
      required: true,
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

mongoose.models = {};
module.exports = mongoose.models.User || mongoose.model("user", UserSchema);
