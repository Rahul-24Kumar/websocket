const express = require("express");
const router = express.Router();
const { bybitExchange, getBybitAllPair } = require("../controllers/bybit");

router.post("/bybitApi", bybitExchange);
router.get("/pairBybit", getBybitAllPair);

module.exports = router;
