const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const registernewaccount = require("./registernewaccount-routes");


router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/registeraccount", registernewaccount);
router.use("/", homeRoutes);

module.exports = router;
