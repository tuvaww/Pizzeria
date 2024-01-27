import React, { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers';
import styles from './style.module.scss';
import classNames from 'classnames';

export const Step2 = () => {
    const [date, setDate] = useState(new Date());
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
    const handleChange = (date) => {
        // const { $y: year, $M: month, $D: day } = date;
        setDate(date);
        setShowSlots(true);
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
    console.log('test', date);

    return (
        <div className={styles.container}>
            <DateCalendar
                views={['day']}
                disablePast={true}
                onChange={handleChange}
            />
            <div className={styles.slots}>{showSlots && slotTemplate}</div>
        </div>
    );
};
