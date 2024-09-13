const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./configs/connectDB.js");
const { logErrors, logRequests } = require("./middlewares/eventManager.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(logRequests);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", require("./routes/root"));

app.use(logErrors);

mongoose.connection.once("connected", () => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});
