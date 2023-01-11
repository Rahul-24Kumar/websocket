const express = require("express");
const router = express.Router();
const { bitgetExchange, getBitgetAllPair } = require("../controllers/bitget");

router.post("/bitgetApi", bitgetExchange);
router.get("/pairBitget", getBitgetAllPair);

module.exports = router;
