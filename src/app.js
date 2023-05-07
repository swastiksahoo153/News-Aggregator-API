const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const loggerMiddleware = require("./middleware/logger");
const rateLimit = require("express-rate-limit");

const newsAggregatorRoutes = require("./routes");

require("dotenv").config();

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowsMs: 15 * 1000, // 5 seconds
  max: 5,
});

routes.use(limiter);
routes.use(loggerMiddleware());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

routes.get("/", (req, res) => {
  res.status(200).send("Welcome to the News Aggregator App!");
});

routes.use("/api/v1/", newsAggregatorRoutes);

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

module.exports = app;
