const express = require("express");
const songController = require("../controllers/songController");

const router = express.Router();

router.route("/songs-stats").get(songController.getSongsStats);

router.route("/:id").patch(songController.updateSong);

router
  .route("/")
  .get(songController.getAllSongs)
  .post(songController.createSong);

module.exports = router;
