const express = require("express");
const router = express.Router();
const { indoexExchange, getIndoexAllPair } = require("../controllers/indoex");

router.post("/indoexApi", indoexExchange);
router.get("/pairIndoex", getIndoexAllPair);

module.exports = router;
