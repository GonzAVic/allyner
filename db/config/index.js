const mongoose = require("mongoose");

const mongoDb = process.env.MONGO_DB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoDb, {
      useNewUrlParser: true,
    });
    console.log("db success connect");
  } catch (err) {
    console.log("error connecting to database");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
