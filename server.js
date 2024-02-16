const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const app = require("./app");

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("> DB connection successful ! ");
});

const port = 3000;

app.listen(port, () => {
  console.log(`> App running on port ${port}...`);
});
