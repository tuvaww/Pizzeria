import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { FormContext } from '../../contexts/FormContext/FormContext';
import { InputField } from './components/inputField/InputField';
import { Textarea } from './components/textarea/Textarea';

export const Form = ({
    children,
    className,
    onSubmit,
    onSuccess = () => {},
    initialValues = {},
}) => {
    const [formState, setFormState] = useState({
        fields: initialValues || {},
        errors: [],
    });

    const setFieldValue = useCallback((name, value) => {
        setFormState((prevState) => ({
            ...prevState,
            fields: {
                ...prevState.fields,
                [name]: value,
            },
        }));
    }, []);

    const getFieldErrors = useCallback(() => formState.errors, [formState]);

    const submitHandler = async (event) => {
        try {
            event.preventDefault();

            const response = await onSubmit(formState.fields);

            if (response?.errors) {
                setFormState((prevState) => ({
                    ...prevState,
                    errors: response.errors,
                }));
            } else {
                setFormState({
                    fields: {},
                    errors: [],
                });
                onSuccess(response?.data);
            }
        } catch (error) {
            console.error('Error in submitHandler in Form component', error);
        }
    };

    const formContext = useMemo(
        () => ({
            ...formState,
            setFieldValue,
            getFieldErrors,
        }),
        [formState, setFieldValue, getFieldErrors]
    );

    return (
        <FormContext.Provider value={formContext}>
            <form className={className} onSubmit={submitHandler}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    className: PropTypes.string,
    initialValues: PropTypes.object,
};

Form.InputField = InputField;
Form.Textarea = Textarea;
