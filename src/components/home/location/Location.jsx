import React, { useState, useEffect } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { LocationDisplay } from './locationDisplay/LocationDisplay';
import { Map } from './map/Map';
import Delivery from '../../../assets/images/delivery.jpg';
import { OpenHours, Locations } from '../../../utils/constants';
import styles from './style.module.scss';
export const Location = () => {
    const [locationId, setLocationId] = useState(1);
    const [location, setLocation] = useState({
        id: 1,
        city: 'Stockholm',
        street: 'Knäpparvägen 40',
        postalCode: '125 57',
        postalAdress: 'Älvsjö',
        latitud: 59.27402,
        longitud: 17.98064,
    });

    useEffect(() => {
        Locations.map((location) => {
            const { id } = location;
            if (id === locationId) {
                const {
                    city,
                    street,
                    postalCode,
                    postalAdress,
                    longitud,
                    latitud,
                } = location;
                setLocation((prevLocation) => ({
                    ...prevLocation,
                    id: id,
                    city: city,
                    street: street,
                    postalCode: postalCode,
                    postalAdress: postalAdress,
                    latitud: latitud,
                    longitud: longitud,
                }));
            }
        });
    }, [locationId]);

    const handleLocationChange = (id) => {
        setLocationId(id);
    };

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
                <h2>Visit any of our locations</h2>
            </div>
            <div className={styles.mapWrapper}>
                <Map
                    location={{
                        lat: location.latitud,
                        long: location.longitud,
                    }}
                />
            </div>
            <LocationDisplay handleLocationChange={handleLocationChange} />

            <img className={styles.img} src={Delivery} alt='delivery image' />
            <div className={styles.infoWrapper}>
                <div className={styles.adress}>
                    <p className={styles.city}>{location.city}</p>
                    <p className={styles.street}>{location.street}</p>
                    <p className={styles.postal}>
                        {location.postalCode}, {location.postalAdress}
                    </p>
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
