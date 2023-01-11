const express = require("express");
const router = express.Router();
const {
  binanceFunction,
  getBinanceAllPair,
} = require("../controllers/binance");

router.post("/binanceApi", binanceFunction);
router.get("/pairBinance", getBinanceAllPair);

module.exports = router;
