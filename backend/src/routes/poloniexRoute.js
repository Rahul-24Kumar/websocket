const express = require("express");
const router = express.Router();
const {
  poloniexExchange,
  getPoloniexAllPair,
} = require("../controllers/poloniex");

router.post("/poloniexApi", poloniexExchange);
router.get("/pairPoloniex", getPoloniexAllPair);

module.exports = router;
