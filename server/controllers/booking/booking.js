const { BookingSchema } = require('../schemas/bookingSchema');
const Booking = require('../../models/booking');
const { translateValidationError } = require('../../utils/validationUtils');
const { fail, success } = require('../../utils/requestUtils');
const { sendBookingConfirmation } = require('../../services/email');

const createBooking = async (req, res) => {
    try {
        const { firstName, lastName, email, location, date, time } = req.body;

        const { error } = BookingSchema.validate(
            { firstName, lastName, email },
            {
                abortEarly: false,
            }
        );

        if (error) {
            const translatedErrors = translateValidationError(error);
            return fail(res, translatedErrors, 400);
        }

        const newBooking = new Booking({
            firstName,
            lastName,
            email,
            location,
            date,
            time,
        });

        await newBooking.save();

        const savedBookingId = newBooking._id;

        sendBookingConfirmation(savedBookingId, email);

        success(res, { message: 'success when creating reservation' }, 200);
    } catch (error) {
        console.log('error', error);
    }
};

const getBooking = async (req, res) => {
    try {
        const id = req.query.id;

        const booking = await Booking.findById(id);

        success(res, { booking }, 200);
    } catch (error) {
        console.log('error', error);
    }
};
module.exports = {
    createBooking,
    getBooking,
};
