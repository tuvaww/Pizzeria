const mongoose = require('mongoose');

const { Schema } = mongoose;

const booking = new Schema(
    {
        firstName: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Reservation', booking);

module.exports = Booking;
