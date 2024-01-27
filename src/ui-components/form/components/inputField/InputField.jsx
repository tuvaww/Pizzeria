import PropTypes from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import { FormContext } from '../../../../contexts/FormContext';
import ErrorWrapper from '../ErrorWrapper';
import styles from './style.module.scss';

const InputField = ({
    name,
    type = 'text',
    width = 'fill',
    placeholder = 'placeholder',
    allowClear = false,
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
                            type='button'
                            className={styles.clearButton}
                            onClick={handleChange}
                            ui-clear={showClear}
                            tabIndex='-1'
                        />
                    )}
                </div>
            </ErrorWrapper>
        </div>
    );
};

export default InputField;

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email']).isRequired,
    width: PropTypes.oneOf(['fill', 'half']),
    placeholder: PropTypes.string.isRequired,
    allowClear: PropTypes.bool,
};
