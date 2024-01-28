import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FormContext } from '../../../../contexts/FormContext/FormContext';
import styles from './style.module.scss';

export const ErrorWrapper = ({ children, name }) => {
    const { getFieldErrors } = useContext(FormContext);

    const error = getFieldErrors().find((err) => err.path === name);

    return (
        <>
            {children}
            {error && (
                <div className={styles.container}>
                    <p className={styles.msg}>{error.message}</p>
                </div>
            )}
        </>
    );
};

ErrorWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
};
