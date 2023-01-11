const express = require("express");
const router = express.Router();
const {
  bitstampFunction,
  getBitstampAllPair,
} = require("../controllers/bitstamp");

router.post("/bitstampApi", bitstampFunction);
router.get("/pairBitstamp", getBitstampAllPair);

module.exports = router;
