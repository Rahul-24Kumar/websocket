const express = require("express");
const router = express.Router();
const { okxExchange, getOkxAllPair } = require("../controllers/okx");

router.post('/okxApi', okxExchange)
router.get('/pairOkx', getOkxAllPair)

module.exports = router;