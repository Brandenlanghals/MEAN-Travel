const express = require("express");
const router = express.Router();
const tripsController = require("../controllers/trips");

// Route to get all trips
router.route("/trips").get(tripsController.tripsList);

// Route to get a single trip by tripCode
router.route("/trips/:tripCode").get(tripsController.tripsFindCode);

module.exports = router;