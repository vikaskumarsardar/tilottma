const express = require("express");
module.exports = (app) => {
  app.use(express.json());
  require("./database/connection");
  app.use("/api", require("./routes"));
};
