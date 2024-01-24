import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { MdDeliveryDining } from 'react-icons/md';

import Logo from '../../../assets/logo/logo.svg';
import { Link } from 'react-router-dom';
import { Button } from '../../../ui-components/button/Button';
import { Links } from '../../../utils/constants';
import styles from './style.module.scss';
export const Header = () => {
    const location = useLocation();
    const currentUrl = location.pathname;

    const linkTemplate = Links.map((link) => {
        const { title, url, id } = link;
        return (
            <Link
                className={classNames(
                    styles.link,
                    currentUrl === url && styles.active
                )}
                to={url}
                key={id}
            >
                {title}
            </Link>
        );
    });

    return (
        <header className={styles.header}>
            <div>
                <img src={Logo} alt='logo' />
            </div>
            <div className={styles.linksContainer}>{linkTemplate}</div>
            <div className={styles.hamburgerMenu}>
                <div className={styles.menuItem} />
                <div className={styles.menuItem} />
                <div className={styles.menuItem} />
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    to='/order-online'
                    size='xl'
                    width='wider'
                    className={styles.button}
                >
                    <div className={styles.buttonChildren}>
                        <MdDeliveryDining className={styles.icon} />
                        <p>Order online</p>
                    </div>
                </Button>
            </div>
        </header>
    );
};
