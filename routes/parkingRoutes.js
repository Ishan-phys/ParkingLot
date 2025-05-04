const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.post('/entry', parkingController.parkVehicle);
router.post('/exit', parkingController.unparkVehicle);
router.get('/availability', parkingController.getAvailability);

module.exports = router;