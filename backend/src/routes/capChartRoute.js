const router = require("express").Router();
const capController = require("../controllers/capChart");


router.get("/capChart", capController.cap);

module.exports = router;