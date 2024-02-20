const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "a song must have title"],
      lowercase: true,
    },
    artist: {
      type: String,
      required: [true, "a song must have artist"],
      lowercase: true,
    },
    album: {
      type: String,
      required: [true, "a song must have album"],
      lowercase: true,
    },
    genre: {
      type: String,
      required: [true, "a song must have genre"],
      lowercase: true,
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
