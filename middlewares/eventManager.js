const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");

const logEvent = async (message, fileName) => {
  const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const logItem = `${timestamp}\t${uuid()}\t${message}\n`;
  // console.log(logItem);

  const logFolder = path.join(__dirname, "../logs");

  const logFilePath = path.join(logFolder, fileName);

  try {
    if (!fs.existsSync(logFolder)) {
      await fsPromises.mkdir(logFolder, { recursive: true });
    }

    await fsPromises.appendFile(logFilePath, logItem);
  } catch (error) {
    console.error("Failed to log event:", error);
  }
};

const logRequests = async (req, res, next) => {
  const msg =
    `${req.method} ${req.url}\n` +
    `Headers: ${JSON.stringify(req.headers)}\n` +
    `Query: ${JSON.stringify(req.query)}\n` +
    `Body: ${req.body}\n`;

  await logEvent(msg, "req.txt");

  next();
};

const logErrors = async (err, req, res, next) => {
  const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const msg =
    `${timestamp} ${req.method} ${req.url}\n` +
    `Error Code: ${err.code || "N/A"}\n` +
    `Message: ${err.message}\n` +
    `Stack: ${err.stack || "N/A"}\n`;

  await logEvent(msg, "error.txt");

  next();
};

module.exports = { logEvent, logRequests, logErrors };
