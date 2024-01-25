import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Locations } from '../../../../utils/constants';
import styles from './style.module.scss';
import classNames from 'classnames';

export const LocationDisplay = ({ handleLocationChange }) => {
    const [activeLocation, setActiveLocation] = useState(1);
    const [hoverId, setHoverId] = useState(0);

    useEffect(() => {
        handleLocationChange(activeLocation);
    }, [activeLocation]);

    const locationTemplate = Locations.map((location) => {
        const { id, city } = location;

        return (
            <div
                className={styles.location}
                key={id}
                onClick={() => setActiveLocation(id)}
                onMouseEnter={() => setHoverId(id)}
                onMouseLeave={() => setHoverId(0)}
            >
                <p
                    className={classNames(
                        hoverId === id && styles.hover,
                        activeLocation === id ? styles.activeCity : styles.city
                    )}
                >
                    {city}
                </p>
                <div
                    className={classNames(
                        activeLocation === id ? styles.activeDot : styles.dot
                    )}
                >
                    <div
                        className={classNames(
                            activeLocation === id
                                ? styles.activeInnerDot
                                : styles.innerDot
                        )}
                    />
                </div>
            </div>
        );
    });
    return (
        <div className={styles.container}>
            <div className={styles.locationsDisplay}>
                <div className={styles.line}></div>
                {locationTemplate}
            </div>
        </div>
    );
};

LocationDisplay.propTypes = {
    handleLocationChange: PropTypes.func.isRequired,
};
