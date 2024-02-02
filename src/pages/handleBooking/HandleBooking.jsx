import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../../utils/requestUtils';
import { Button } from '../../ui-components/button/Button';
import { MdLocationOn } from 'react-icons/md';
import { FaCalendarDays } from 'react-icons/fa6';
import { GoClockFill } from 'react-icons/go';

import styles from './style.module.scss';

/* TODO - validate token */
export const HandleBooking = () => {
    const navigate = useNavigate();
    const locationUrl = useLocation();
    const queryParams = new URLSearchParams(locationUrl.search);
    const id = queryParams.get('id');
    const [booking, setBooking] = useState({
        location: '',
        date: '',
        time: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    const { location, date, time } = booking;

    const handleGetBooking = async () => {
        const response = await getRequest(`/bookings/get-booking?id=${id}`);
        const { booking } = response;
        const { location, date, time, email, firstName, lastName } = booking;

        setBooking((prevState) => ({
            ...prevState,
            location,
            date,
            time,
            firstName,
            lastName,
            email,
        }));
    };
    useEffect(() => {
        handleGetBooking();
    }, [id]);

    const handleCancelBooking = async () => {
        await postRequest('/bookings/delete', { id });

        navigate('/');
    };

    const handleReebooking = () => {
        navigate(`/reservation?rebook=true&id=${id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <h2 className={styles.header}>Handle booking</h2>

                <div className={styles.text}>
                    <div className={styles.wrapper}>
                        <MdLocationOn size={22} />
                        <p>Location: {location}</p>
                    </div>
                    <div className={styles.wrapper}>
                        <FaCalendarDays size={22} />
                        <p>Date: {date}</p>
                    </div>
                    <div className={styles.wrapper}>
                        <GoClockFill size={22} />
                        <p>Time: {time}</p>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <Button size="sm" radius="sm" onClick={handleCancelBooking}>
                        Cancel booking
                    </Button>
                    <Button size="sm" radius="sm" onClick={handleReebooking}>
                        Rebook
                    </Button>
                </div>
            </div>
        </div>
    );
};
