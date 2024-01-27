import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './style.module.scss';

export const Spinner = ({ size, className }) => {
    return (
        <div
            data-ui-size={size}
            className={classNames(styles.spinner, className)}
        />
    );
};

Spinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl']),
    className: PropTypes.string,
};

Spinner.defaultProps = {
    size: 'md',
    className: null,
};
