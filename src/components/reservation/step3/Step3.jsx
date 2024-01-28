import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../ui-components/form/Form';
import { Button } from '../../../ui-components/button/Button';
import { postRequest,returnErrors } from '../../../utils/requestUtils';
import styles from './styles.module.scss';

export const Step3 = ({booking}) => {
    const [sucess,setSucess] = useState(false)
    const onSubmit = async (data) => {
        try {
            const bookingInfo = {...booking,...data}
          await postRequest('/bookings/create',bookingInfo)


        } catch (error) {
            return returnErrors(error);
        }
    };

    const onSuccess = () => {
        setSucess(true)
    };
    return (
        <div className={styles.container}>
            <Form onSubmit={onSubmit} onSuccess={onSuccess} className={styles.form}>
                <Form.InputField
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    label="First name"
                />
                <Form.InputField
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    label="Last name"
                />
                <Form.InputField
                    name="email"
                    type="email"
                    placeholder="Email"
                    label="Email"
                />
                <Button radius='sm'>Book</Button>
            </Form>

            {sucess && <div className={styles.textContainer}>
                <p>Booking confirmed!</p>
                </div>}
        </div>
    );
};

Step3.propTypes ={
    booking: PropTypes.object.isRequired
}
