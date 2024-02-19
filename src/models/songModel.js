const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "a song must have title"],
    },
    artist: {
      type: String,
      required: [true, "a song must have artist"],
    },
    album: {
      type: String,
      required: [true, "a song must have album"],
    },
    genre: {
      type: String,
      required: [true, "a song must have genre"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

songSchema.index({ title: "text" });

const Song = new mongoose.model("Song", songSchema);

module.exports = Song;
