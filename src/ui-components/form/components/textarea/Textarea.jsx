import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormContext } from '../../../../contexts/FormContext/FormContext';
import { ErrorWrapper } from '../errorWrapper/ErrorWrapper';
import styles from './style.module.scss';

export const Textarea = ({
    name,
    placeholder,
    maxLength = null,
    minLength = null,
    className = '',
    label,
}) => {
    const { setFieldValue, fields } = useContext(FormContext);
    const [value, setValue] = useState(fields[name] || '');

    const isShorterThanMin = value.length < minLength;

    const handleTextareaChange = (event) => {
        const { value } = event.currentTarget;
        setValue(value);

        setFieldValue(name, value);
    };

    return (
        <div className={styles.container}>
            <ErrorWrapper name={name}>
                {label && (
                    <label className={styles.label} htmlFor={name}>
                        {label}
                    </label>
                )}
                <textarea
                    name={name}
                    id={name}
                    value={value}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    onChange={handleTextareaChange}
                    className={classNames(styles.textarea, className)}
                />
                {maxLength && (
                    <span className={styles.maxLength}>
                        <span className={isShorterThanMin ? styles.short : ''}>
                            {value.length}
                        </span>{' '}
                        / {maxLength}
                    </span>
                )}
            </ErrorWrapper>
        </div>
    );
};

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    className: PropTypes.string,
    label: PropTypes.string,
};
