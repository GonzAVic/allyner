const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, {
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
