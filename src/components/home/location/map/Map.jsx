import React, { useState, useEffect } from 'react';
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    useLoadScript,
} from '@react-google-maps/api';
import { useMemo } from 'react';
import styles from './style.module.scss';

export const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

    const center = useMemo(() => ({ lat: 59.2740763, lng: 17.9805705 }), []);
    const destination = useMemo(
        () => ({
            lat: 59.2740763,
            lng: 17.9805705,
        }),
        []
    ); // Replace with your destination coordinates

    const [directions, setDirections] = useState(null);

    useEffect(() => {
        if (isLoaded) {
            const directionsService =
                new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: center,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`Error fetching directions: ${status}`);
                    }
                }
            );
        }
    }, [isLoaded, center, destination]);

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

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
                    {directions && (
                        <DirectionsRenderer directions={directions} />
                    )}
                    <Marker position={destination} />
                </GoogleMap>
            )}
        </div>
    );
};
