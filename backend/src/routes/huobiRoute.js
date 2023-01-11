const express = require("express");
const router = express.Router();
const {
  huobiapiExchange,
  getHuobiapiAllPair,
} = require("../controllers/huobi");

router.post("/huobiapi", huobiapiExchange);
router.get("/pairHuobiapi", getHuobiapiAllPair);

module.exports = router;
