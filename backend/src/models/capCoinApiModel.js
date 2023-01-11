const mongoose = require("mongoose");

const capCoinSchema = new mongoose.Schema(
  {
    rank: {
      type: String,
      default: null,
    },

    coinName: {
      type: String,
      default: null,
    },

    symbol: {
      type: String,
      default: null,
    },

    priceUsd: {
      type: Number,
      default: null,
    },

    volumeUsd24Hr: {
      type: Number,
      default: null,
    },

    supply: {
      type: Number,
      default: null,
    },

    maxSupply: {
      type: Number,
      default: null,
    },

    marketCapUsd: {
      type: Number,
      default: null,
    },

    changePercent24Hr: {
      type: Number,
      default: null,
    },

    explorer: {
      type: String,
      default: null,
    },

    vwap24Hr: {
      type: Number,
      default: null,
    },

    time: {
      type: String,
      default: Date.now,
    },
  },

  { timestamps: true }
);

capCoinSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });
module.exports = mongoose.model("capCoin100", capCoinSchema);
