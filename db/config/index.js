import mongoose from "mongoose";

const mongoDB =
  "mongodb+srv://pedro:4321qwER@archticase.pzhcd.mongodb.net/archticase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
    });
    console.log("db success connect");
  } catch (err) {
    console.log("error connecting to database");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
