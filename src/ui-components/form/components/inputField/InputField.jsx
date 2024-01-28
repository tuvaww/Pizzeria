import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../../../../contexts/FormContext/FormContext';
import { ErrorWrapper } from '../errorWrapper/ErrorWrapper';
import styles from './style.module.scss';

export const InputField = ({
    name,
    type = 'text',
    width = 'fill',
    placeholder = 'placeholder',
    allowClear = false,
    label,
}) => {
    const { setFieldValue, formState } = useContext(FormContext);
    const [value, setValue] = useState(formState?.fields[name] || '');

    const showClear = Boolean(value.length > 0).toString();

    const handleChange = useCallback(
        (event) => {
            const newValue = event.target.value;
            setFieldValue(name, newValue);
            setValue(newValue);
        },
        [name, setFieldValue]
    );

    return (
        <div className={styles.container} ui-width={width}>
            <ErrorWrapper name={name}>
                <div className={styles.inputWrapper} ui-width={width}>
                    {label && (
                        <label htmlFor={name} className={styles.label}>
                            {label}
                        </label>
                    )}
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        className={styles.input}
                        ui-clear={showClear}
                    />

                    {allowClear && (
                        <button
                            type="button"
                            className={styles.clearButton}
                            onClick={handleChange}
                            ui-clear={showClear}
                            tabIndex="-1"
                        />
                    )}
                </div>
            </ErrorWrapper>
        </div>
    );
};

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email']).isRequired,
    width: PropTypes.oneOf(['fill', 'half']),
    placeholder: PropTypes.string.isRequired,
    allowClear: PropTypes.bool,
    label: PropTypes.string,
};
