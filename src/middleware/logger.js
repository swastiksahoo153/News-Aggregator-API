const fs = require("fs");
const path = require("path");
const logger = require("morgan");

const appDir = path.dirname(require.main.filename);
const logsDir = path.join(appDir, "logs");

const loggerMiddleware = () => {
  return logger("combined", {
    stream: fs.createWriteStream(logsDir, { flags: "a" }),
  });
};

module.exports = loggerMiddleware;
