import React from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import styles from './style.module.scss';

export const Map = ({ location }) => {
    const { lat, long } = location;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

    const center = useMemo(() => ({ lat: lat, lng: long }), [lat, long]);

    return (
        <div className={styles.mapContainer}>
            {!isLoaded ? (
                <div className={styles.loading}></div>
            ) : (
                <GoogleMap
                    mapContainerClassName={styles.map}
                    center={center}
                    zoom={10}
                >
                    <MarkerF position={{ lat: lat, lng: long }} />
                </GoogleMap>
            )}
        </div>
    );
};

Map.propTypes = {
    location: PropTypes.object.isRequired,
};
