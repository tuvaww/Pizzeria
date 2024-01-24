import React, { useState } from 'react';
import { Locations } from '../../../../utils/constants';
import styles from './style.module.scss';
import classNames from 'classnames';

export const LocationDisplay = () => {
    const [activeCity, setActiveCity] = useState(1);

    const handleChangeCity = (id) => {
        setActiveCity(id);
    };

    const locationTemplate = Locations.map((location) => {
        const { id, city } = location;
        return (
            <div
                className={styles.location}
                key={id}
                onClick={() => handleChangeCity(id)}
            >
                <p className={styles.city}>{city}</p>
                <div
                    className={classNames(
                        activeCity === id ? styles.activeDot : styles.dot
                    )}
                >
                    <div
                        className={classNames(
                            activeCity === id
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
