const router = require("express").Router();

router.use("/auth", require("./auth/auth.employee-business-route"));
router.use("/details", require("./details/details.business-route"));
router.use("/service", require("./service/service.business-route"));

router.use("/", require("./all-business/all-business.emplyee-route"));



module.exports = router;
