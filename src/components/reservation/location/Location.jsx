import React from 'react';
import { Locations } from '../../../utils/constants';
import { LocationItem } from './locationItem/LocationItem';
import styles from './style.module.scss';

export const Location = () => {
    const locationsTemplate = Locations.map((location) => {
        const { id } = location;
        return <LocationItem key={id} />;
    });

    return <div className={styles.wrapper}>{locationsTemplate}</div>;
};
