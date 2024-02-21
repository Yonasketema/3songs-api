const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const app = require("./app");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("> DB connection successfully"))
  .catch(() => console.log("> DB connection failed"));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`> App running on PORT ${PORT}...`);
});
