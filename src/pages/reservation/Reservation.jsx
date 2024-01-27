import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { Step1 } from '../../components/reservation/step1/Step1';
import { Button } from '../../ui-components/button/Button';
import { Step2 } from '../../components/reservation/step2/Step2';
import { getLocalStorage, setLocalStorage } from '../../utils/storageUtils';

export const Reservation = () => {
    const [step, setStep] = useState(1);
    const [nextButtonIsDisabled, setNextButtonIsDisabled] = useState('false');
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
    }, [location, step]);

    useEffect(() => {
        const localStorage = getLocalStorage('reservation');
        if (localStorage) {
            console.log('local s', localStorage);
        } else {
            setLocalStorage('reservation', booking);
        }
    }, [location]);

    const handleNext = () => {
        if (nextButtonIsDisabled === 'true') {
            return;
        } else {
            setStep((prevState) => prevState + 1);
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

    return (
        <div className={styles.container}>
            <div className={styles.steps}>
                <div className={step === 1 ? styles.active : styles.step}></div>
                <div className={step === 2 ? styles.active : styles.step}></div>

                <div className={step === 3 ? styles.active : styles.step}></div>
            </div>

            <div className={styles.section}>
                <div className={styles.header}>
                    <h2>test</h2>
                </div>
                {step === 1 && (
                    <Step1 handleUpdateBooking={handleUpdateBooking} />
                )}
                {step === 2 && <Step2 />}

                <div className={styles.buttonContainer}>
                    <div className={styles.buttonWrapper}>
                        {step > 1 && (
                            <Button
                                width='fill'
                                size='xs'
                                radius='sm'
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        )}
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button
                            width='fill'
                            size='xs'
                            radius='sm'
                            onClick={handleNext}
                            disabled={nextButtonIsDisabled}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
