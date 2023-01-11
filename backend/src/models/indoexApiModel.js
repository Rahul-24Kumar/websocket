const mongoose = require("mongoose");

const indeoxSchema = new mongoose.Schema(
  {
    coinName: {
      type: String,
      default: null,
    },
    symbol: {
      type: String,
      default: null,
    },
    pairName: {
      type: String,
      default: null,
    },
    volume: {
      type: Number,
      default: null,
    },
    baseVolume: {
      type: Number,
      default: null,
    },
    quoteVolume: {
      type: Number,
      default: null,
    },
    lastPrice: {
      type: Number,
      default: null,
    },
    lastPrice1h: {
      type: Number,
      default: null,
    },
    highPrice: {
      type: Number,
      default: null,
    },
    lowPrice: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    openPrice: {
      type: Number,
      default: null,
    },
    askPrice: {
      type: Number,
      default: null,
    },
    baseCurrency: {
      type: String,
      default: null,
    },
    quoteCurrency: {
      type: String,
      default: null,
    },
    askQty: {
      type: String,
      default: null,
    },
    lastQty: {
      type: Number,
      default: null,
    },
    amount: {
      type: Number,
      default: null,
    },
    bidPrice: {
      type: Number,
      default: null,
    },
    priceChange: {
      type: Number,
      default: null,
    },
    priceChangePercent: {
      type: Number,
      default: null,
    },
    weightedAvgPrice: {
      type: String,
      default: null,
    },
    openTime: {
      type: String,
      default: null,
    },
    closeTime: {
      type: String,
      default: null,
    },
    change1h: {
      type: Number,
      default: null,
    },
    change24h: {
      type: Number,
      default: null,
    },
    minBuy: {
      type: String,
      default: null,
    },
    minSell: {
      type: String,
      default: null,
    },
    sellFee: {
      type: String,
      default: null,
    },
    buyFee: {
      type: String,
      default: null,
    },
    firstId: {
      type: String,
      default: null,
    },
    lastId: {
      type: String,
      default: null,
    },
    tradeCount: {
      type: Number,
      default: null,
    },
    cmcid: {
      type: String,
      default: null,
    },
    timeStamp: {
      type: String,
      default: null,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

indeoxSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
module.exports = mongoose.model("indeox", indeoxSchema);
