import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Locations } from '../../../utils/constants';
import { LocationItem } from './locationItem/LocationItem';
import styles from './style.module.scss';
import { getLocalStorage } from '../../../utils/storageUtils';

export const Step1 = ({ handleUpdateBooking }) => {
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        const localStorage = getLocalStorage('reservation');
        if (localStorage) {
            const { location } = localStorage;

            if (location) {
                const selectedLocation = Locations.find(
                    (l) => l.city === location
                );
                const { id } = selectedLocation;
                setSelectedId(id);
            }
        }
    }, []);

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
