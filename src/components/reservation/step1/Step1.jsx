import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Locations } from '../../../utils/constants';
import { LocationItem } from './locationItem/LocationItem';
import styles from './style.module.scss';

export const Step1 = ({ handleUpdateBooking }) => {
    const [selectedId, setSelectedId] = useState(0);

    const handleClick = (id, city) => {
        setSelectedId(id);
        handleUpdateBooking('location', city);
    };

    const locationsTemplate = Locations.map((location) => {
        const { id, city } = location;
        return (
            <div key={id} onClick={() => handleClick(id, city)}>
                <LocationItem location={location} selectedId={selectedId} />
            </div>
        );
    });

    return <div className={styles.wrapper}>{locationsTemplate}</div>;
};

Step1.propTypes = {
    handleUpdateBooking: PropTypes.func.isRequired,
};
