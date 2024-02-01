import React, { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers';
//import dayjs, { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
import { getLocalStorage } from '../../../utils/storageUtils';

export const Step2 = ({ handleUpdateBooking }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const [showSlots, setShowSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    const slots = [
        '12.00',
        '13.00',
        '14.00',
        '15.00',
        '18.00',
        '19.00',
        '20.00',
        '21.00',
        '22.00',
        '23.00',
    ];

    useEffect(() => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        setSelectedDate(formattedDate);

        const localStorage = getLocalStorage('reservation');
        const { date, time } = localStorage;
        if (time) {
            setSelectedSlot(time);
        }
        if (date) {
            setSelectedDate(date);
        }
    }, []);

    useEffect(() => {
        if (selectedDate) {
            setShowSlots(true);
            handleUpdateBooking('date', selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        handleUpdateBooking('time', selectedSlot);
    }, [selectedSlot]);

    const handleChange = (date) => {
        const { $y: year, $M: month, $D: day } = date;
        const currentMonth = month + 1;
        let correctedMonth = currentMonth;
        if (currentMonth < 10) {
            correctedMonth = '0' + currentMonth;
        }
        const newDate = year + '-' + correctedMonth + '-' + day;
        setSelectedDate(newDate);
        setSelectedSlot('');
        setShowSlots(false);
    };

    const handleClick = (slot) => {
        setSelectedSlot(slot);
    };

    const slotTemplate = slots.map((slot) => {
        return (
            <div
                key={slot}
                className={classNames(
                    styles.slot,
                    selectedSlot === slot && styles.selected
                )}
                onClick={() => handleClick(slot)}
            >
                <p>{slot}</p>
            </div>
        );
    });

    return (
        <div className={styles.container}>
            <DateCalendar
                views={['day']}
                disablePast={true}
                onChange={handleChange}
                value={dayjs(selectedDate)}
            />
            <div className={styles.slots}>{showSlots && slotTemplate}</div>
        </div>
    );
};

Step2.propTypes = {
    handleUpdateBooking: PropTypes.func.isRequired,
};
