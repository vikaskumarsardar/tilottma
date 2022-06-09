const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;

require("./app")(app);
app.listen(port, () => {
  console.log(`listning on port ${port}`);
});
