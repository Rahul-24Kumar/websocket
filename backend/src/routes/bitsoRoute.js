const express = require("express");
const router = express.Router();
const { bitsoExchange, getBitsoAllPair } = require("../controllers/bitso");

router.post("/bitsoApi", bitsoExchange);
router.get("/pairBitso", getBitsoAllPair);

module.exports = router;
