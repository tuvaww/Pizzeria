import React from 'react';
import { Link } from 'react-router-dom';
import { Links, OpenHours } from '../../../utils/constants';
import Logo from '../../../assets/logo/logo.svg';
import styles from './style.module.scss';
export const Footer = () => {
    const linkTemplate = Links.map((link) => {
        const { title, url, id } = link;
        return (
            <Link className={styles.link} to={url} key={id}>
                {title}
            </Link>
        );
    });

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
        <footer className={styles.footer}>
            <div className={styles.logoContainer}>
                <img src={Logo} alt='logo' />
            </div>
            <div className={styles.linkContainer}>{linkTemplate}</div>
            <div className={styles.openHoursContainer}>{openHoursTemplate}</div>
            <div className={styles.contactInfoContainer}>
                <div className={styles.contactInfo}>
                    <p>Crust@Exempel.com</p>
                    <p>+46783457588</p>
                </div>

                <div className={styles.adress}>
                    <p>Stockholm</p>
                    <p>125 57 Älvsjö</p>
                    <p>Testvägen 40</p>
                </div>
            </div>
        </footer>
    );
};
