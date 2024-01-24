import React from 'react';
import Pizza from '../assets/images/pizza_half.png';
import { Location } from '../components/home/location/Location';
import styles from './style.module.scss';
export const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.header}>
                <img className={styles.headerImg} src={Pizza} alt='pizza' />
            </div>
            <Location />
        </div>
    );
};
