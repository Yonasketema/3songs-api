const express = require("express");
const songController = require("../controllers/songController");

const router = express.Router();

router.route("/genre-stats").get(songController.getSongsGenreStats);
router.route("/album-stats").get(songController.getAlbumSongsStats);
router.route("/artist-stats").get(songController.getArtistSongsStats);

router
  .route("/:id")
  .patch(songController.updateSong)
  .delete(songController.deleteSong);

router
  .route("/")
  .get(songController.getAllSongs)
  .post(songController.createSong);

module.exports = router;
