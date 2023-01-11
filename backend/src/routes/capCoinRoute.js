const express = require("express");
const router = express.Router();
const {
  capCoin100Coins,
  getCoinPairing,
  updateCoin,
  addCoin,
} = require("../controllers/capCoin");

router.post("/cap100Coin", capCoin100Coins);
router.get("/cap100Coin", capCoin100Coins);
router.get("/getCoinPair/:symbol", getCoinPairing);

router.put("/cap100Coin/:Symbol", updateCoin);

router.post("/addCoin", addCoin);

module.exports = router;
