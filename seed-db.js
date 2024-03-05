const fs = require("fs");
require("dotenv").config({ path: ".env" });

const mongoose = require("mongoose");
const Songs = require("./src/models/songModel");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("> DB connection successfully"))
  .catch(() => console.log("> DB connection failed"));

//READ JSON FILE

const songs = JSON.parse(fs.readFileSync("./dev-data/songs.json", "utf-8"));

const seedData = async () => {
  try {
    await Songs.create(songs);
    console.log("> Data successfully loaded !");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

// Delete data from DB

const deleteData = async () => {
  try {
    await Songs.deleteMany();
    console.log("> Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

switch (process.argv[2]) {
  case "--seed":
    seedData();
    break;
  case "--delete":
    deleteData();
    break;
  default:
    process.exit();
}

//  node seed-data.js --seed
