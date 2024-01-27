import React from 'react';
import { PropTypes } from 'prop-types';
import { MdLocationOn } from 'react-icons/md';
import styles from './style.module.scss';
import classNames from 'classnames';

export const LocationItem = ({ location, selectedId }) => {
    const { city, id } = location;

    return (
        <div
            className={classNames(
                styles.locationItem,
                id === selectedId && styles.selected
            )}
        >
            <MdLocationOn size={30} className={styles.icon} />

            <p className={styles.text}>{city}</p>
        </div>
    );
};

LocationItem.propTypes = {
    location: PropTypes.object.isRequired,
    selectedId: PropTypes.number,
};
