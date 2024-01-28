import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Step1 } from '../../components/reservation/step1/Step1';
import { Step2 } from '../../components/reservation/step2/Step2';
import { Step3 } from '../../components/reservation/step3/Step3';
import { Button } from '../../ui-components/button/Button';
import { getLocalStorage, setLocalStorage } from '../../utils/storageUtils';
import styles from './style.module.scss';
import { postRequest } from '../../utils/requestUtils';

export const Reservation = () => {
    const locationUrl = useLocation();
    const queryParams = new URLSearchParams(locationUrl.search);
    const rebook = queryParams.get('rebook');
    const id = queryParams.get('id');
    const [rebookingConfirmed, setRebookingConfirmed] = useState(false);
    const [step, setStep] = useState(1);
    const [nextButtonIsDisabled, setNextButtonIsDisabled] = useState('false');
    const titles = [
        'Choose location',
        'Choose date and time',
        'Add booking information',
    ];
    const [booking, setBooking] = useState({
        location: '',
        date: '',
        time: '',
    });
    const { location, date, time } = booking;

    useEffect(() => {
        const disabled = 'true';
        const notDisabled = 'false';

        if (step === 1 && !location.length) {
            setNextButtonIsDisabled(disabled);
            return;
        } else if (step === 1 && location.length) {
            setNextButtonIsDisabled(notDisabled);
            return;
        }

        if ((step === 2 && !date) || (step === 2 && !time)) {
            setNextButtonIsDisabled(disabled);
            return;
        } else if (step === 2 && date && time) {
            setNextButtonIsDisabled(notDisabled);
            return;
        } else {
            setNextButtonIsDisabled(disabled);
            return;
        }
    }, [location, step, date, time]);

    useEffect(() => {
        const localStorage = getLocalStorage('reservation');
        if (localStorage) {
            const { location, date, time } = localStorage;
            setBooking((prevState) => ({
                ...prevState,
                location: location,
                date: date,
                time: time,
            }));
        }
    }, []);

    useEffect(() => {
        if (location || date || time) {
            setLocalStorage('reservation', booking);
        }
    }, [location, date, time, booking]);

    const handleNext = async () => {
        if (rebook && step === 2) {
            const newBooking = { ...booking, id };
            await postRequest('/bookings/update', newBooking);
            setRebookingConfirmed(true);
        } else {
            if (nextButtonIsDisabled === 'true') {
                return;
            } else {
                setStep((prevState) => prevState + 1);
            }
        }
    };
    const handleBack = () => {
        setStep((prevState) => prevState - 1);
    };

    const handleUpdateBooking = (key, value) => {
        setBooking((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };
    const handleTitle = () => {
        if (step === 1) {
            return titles[0];
        }
        if (step === 2) {
            return titles[1];
        } else {
            return titles[2];
        }
    };
    return (
        <div className={styles.container}>
            {!rebook && (
                <div className={styles.steps}>
                    <div
                        className={step === 1 ? styles.active : styles.step}
                    ></div>
                    <div
                        className={step === 2 ? styles.active : styles.step}
                    ></div>
                    <div
                        className={step === 3 ? styles.active : styles.step}
                    ></div>
                </div>
            )}

            <div className={styles.section}>
                <div className={styles.header}>
                    <h2>{handleTitle()}</h2>
                </div>
                {step === 1 && (
                    <Step1 handleUpdateBooking={handleUpdateBooking} />
                )}
                {step === 2 && (
                    <Step2 handleUpdateBooking={handleUpdateBooking} />
                )}
                {step === 3 && !rebook && <Step3 booking={booking} />}

                {rebookingConfirmed && (
                    <h2 className={styles.text}>Booking confirmed!</h2>
                )}

                <div className={styles.buttonContainer}>
                    {step > 1 && (
                        <div className={styles.buttonWrapper}>
                            <Button
                                width="fill"
                                size="xs"
                                radius="sm"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </div>
                    )}

                    {step < 3 && (
                        <div className={styles.buttonWrapper}>
                            <Button
                                width="fill"
                                size="xs"
                                radius="sm"
                                onClick={handleNext}
                                disabled={nextButtonIsDisabled}
                            >
                                {step === 2 && rebook ? 'Book' : 'Next'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
