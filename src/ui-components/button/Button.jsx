import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

export const Button = forwardRef(
    (
        {
            children,
            to = '',
            onClick = () => {},
            size = 'md',
            width = 'wide',
            radius = 'md',
            color = 'primary',
            disabled = false,
            className = '',
            ...attributes
        },
        ref
    ) => {
        const Tag = to ? Link : 'button';

        return (
            <Tag
                ref={ref}
                to={to}
                onClick={onClick}
                ui-size={size}
                ui-width={width}
                ui-radius={radius}
                ui-color={color}
                disabled={disabled}
                className={classNames('button', className)}
                {...attributes}
            >
                <span className={'content'}>{children}</span>
            </Tag>
        );
    }
);

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    width: PropTypes.oneOf(['fill', 'half', 'wide', 'wider', null]),
    radius: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg']),
    color: PropTypes.oneOf(['primary', 'transparent', 'grey']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
};
