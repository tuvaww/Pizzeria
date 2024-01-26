import React from 'react';
import { PropTypes } from 'prop-types';
import { MdLocationOn } from 'react-icons/md';
import styles from './style.module.scss';

export const LocationItem = ({ location }) => {
    const { city } = location;
    return (
        <div className={styles.locationItem}>
            <MdLocationOn size={30} className={styles.icon} />

            <p className={styles.text}>{city}</p>
        </div>
    );
};

LocationItem.propTypes = {
    location: PropTypes.object.isRequired,
};
