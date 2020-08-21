const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const config = require("config");

const { routes } = require("./src/routes");

mongoose.connect(config.get("mongoUrl"), {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  initial app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach((route) => {
  app.use(`/api/v1/${route}`, require(`./src/routes/${route}`));
});

// declare our routes
const PORT = config.get("port") || 3000;
http.createServer({}, app).listen(PORT);

console.log(`Server running at ${PORT}`);
