const mongoose = require("mongoose");

const bitstampSchema = new mongoose.Schema(
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
      type: String,
      default: null,
    },
    quoteVolume: {
      type: String,
      default: null,
    },
    lastPrice: {
      type: String,
      default: null,
    },
    lastPrice1h: {
      type: String,
      default: null,
    },
    highPrice: {
      type: String,
      default: null,
    },
    lowPrice: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    openPrice: {
      type: String,
      default: null,
    },
    askPrice: {
      type: String,
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
      type: String,
      default: null,
    },
    priceChange: {
      type: String,
      default: null,
    },
    priceChangePercent: {
      type: String,
      default: null,
    },
    weightedAvgPrice: {
      type: String,
      default: null,
    },
    openTime: {
      type: Number,
      default: null,
    },
    closeTime: {
      type: Number,
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
bitstampSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = mongoose.model("bitstamp", bitstampSchema);
