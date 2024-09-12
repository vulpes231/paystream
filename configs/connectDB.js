const { mongoose } = require("../utils/utilities");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
