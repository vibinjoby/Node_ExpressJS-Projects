const http = require("http");
const appDebugger = require("debug")("app:startup");
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const logger = require("./middleware/logger");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const courses = require("./routes/courses");
const home = require("./routes/home");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use("/api/courses", courses);
app.use("/", home);
if (app.get("env")) app.use(morgan("tiny"));
app.use(helmet());
appDebugger(config.get("name"));

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
