const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const songRouter = require("./src/routes/songRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/songs", songRouter);

module.exports = app;
