const express = require('express');
const router = express.Router();

const {
    createBooking,
    getBooking,
} = require('../../controllers/booking/booking');

router.post('/create', createBooking);
router.get('/get-booking', getBooking);

module.exports = router;
