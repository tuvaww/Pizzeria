const express = require('express');
const router = express.Router();

const {
    createBooking,
    getBooking,
    deleteBooking,
    updateBooking,
} = require('../../controllers/booking/booking');

router.post('/create', createBooking);
router.get('/get-booking', getBooking);
router.post('/delete', deleteBooking);
router.post('/update', updateBooking);

module.exports = router;
