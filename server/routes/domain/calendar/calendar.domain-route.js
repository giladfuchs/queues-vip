const router = require("express").Router();
const queueController = require("../../../controller/queue/queue.controller");
const isAuth = require("../../../middleware/is-auth");


router.post("/", isAuth("client"), queueController.postQueue);

router.post("/setServiceToQueue", isAuth("client"), queueController.setServiceToQueue);


module.exports = router;
