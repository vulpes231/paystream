const { connectDB } = require("./configs/connectDB.js");
const { logErrors, logRequests } = require("./middlewares/eventManager.js");
const { express, mongoose } = require("./utils/utilities");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.use(logRequests);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use("/", require("./routes/root"));

    app.use(logErrors);

    mongoose.connection.once("open", () => {
      app.listen(PORT, () =>
        console.log(`Server started on http://localhost:${PORT}`)
      );
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
