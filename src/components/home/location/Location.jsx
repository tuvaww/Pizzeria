import React from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { LocationDisplay } from './locationDisplay/LocationDisplay';
import { Map } from './map/Map';
import Delivery from '../../../assets/images/delivery.jpg';
import { OpenHours } from '../../../utils/constants';
import styles from './style.module.scss';
export const Location = () => {
    const openHoursTemplate = OpenHours.map((obj) => {
        const { days, time, id } = obj;

        return (
            <div className={styles.openHours} key={id}>
                <p className={styles.days}>{days}:</p>
                <p className={styles.time}>{time}</p>
            </div>
        );
    });
    return (
        <div className={styles.locationContainer}>
            <div className={styles.header}>
                <p>Visit any of our locations</p>
            </div>
            <div className={styles.mapWrapper}>
                <Map />
            </div>
            <LocationDisplay />

            <img className={styles.img} src={Delivery} alt='delivery image' />
            <div className={styles.infoWrapper}>
                <div className={styles.adress}>
                    <p className={styles.city}>Stockholm</p>
                    <p className={styles.street}>Knäpparvägen 40</p>
                    <p className={styles.postal}>125 57, Älvsjö</p>
                </div>

                <div className={styles.openHoursWrapper}>
                    <p className={styles.headline}>Hours of operation</p>
                    {openHoursTemplate}
                </div>
                <div className={styles.phone}>
                    <BsTelephoneFill size={20} className={styles.icon} />
                    <p>+46875476533</p>
                </div>
            </div>
        </div>
    );
};
