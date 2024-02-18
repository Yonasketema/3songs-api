const Song = require("../models/songModel");

exports.createSong = async (req, res) => {
  console.log(req.body);
  try {
    const songs = await Song.create(req.body);

    res.status(201).json(songs);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort("-updatedAt");

    res.status(200).json(songs);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(song);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getSongsGenreStats = async (req, res) => {
  try {
    const genre = await Song.aggregate([
      {
        $group: {
          _id: "$genre",
          number: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          number: 1,
          genre: "$_id",
        },
      },
    ]);

    res.status(200).json(genre);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.getAlbumSongsStats = async (req, res) => {
  try {
    const albumSongsStats = await Song.aggregate([
      {
        $group: {
          _id: "$album",
          songs: { $sum: 1 },
          artist: { $first: "$artist" },
        },
      },
      {
        $project: {
          _id: 0,
          artist: 1,
          songs: 1,
          album: "$_id",
        },
      },
    ]);

    res.status(200).json(albumSongsStats);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.getArtistSongsStats = async (req, res) => {
  try {
    const artistSongsStats = await Song.aggregate([
      {
        $group: {
          _id: "$album",
          artist: { $first: "$artist" },
          album: { $first: "$album" },
          songs: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$artist",
          album: { $sum: 1 },
          songs: { $sum: "$songs" },
        },
      },
      {
        $project: {
          _id: 0,
          album: 1,
          songs: 1,
          artist: "$_id",
        },
      },
    ]);

    res.status(200).json(artistSongsStats);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};
