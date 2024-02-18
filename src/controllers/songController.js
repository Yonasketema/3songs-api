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

exports.getSongsStats = async (req, res) => {
  try {
    // const songs = await Song.aggregate([
    //   {
    //     $group: {
    //       _id: "$album",
    //       artist: { $first: "$artist" },
    //       album: { $first: "$album" },
    //       songs: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$artist",
    //       album: { $sum: 1 },
    //       songs: { $sum: "$songs" },
    //     },
    //   },
    // ]);
    // const songs = await Song.aggregate([
    //   {
    //     $group: {
    //       _id: "$album",
    //       songs: { $sum: 1 },
    //       artist: { $first: "$artist" },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       artist: 1,
    //       songs: 1,
    //       album: "$_id",
    //     },
    //   },
    // ]);
    const songs = await Song.aggregate([
      {
        $group: {
          _id: "$genre",
          size: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};
