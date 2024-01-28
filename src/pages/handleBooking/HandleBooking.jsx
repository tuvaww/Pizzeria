import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRequest } from '../../utils/requestUtils';
import { Button } from '../../ui-components/button/Button';
import styles from './style.module.scss';

export const HandleBooking = () => {
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

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <h2 className={styles.header}>Handle booking</h2>

                <div className={styles.text}>
                    <p>Location: {location}</p>
                    <p>Date: {date}</p>
                    <p>Time: {time}</p>
                </div>

                <div>
                    <Button>Cancel booking</Button>
                    <Button>Rebook</Button>
                </div>
            </div>
        </div>
    );
};
