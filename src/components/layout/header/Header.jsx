import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { MdDeliveryDining } from 'react-icons/md';

import Logo from '../../../assets/logo/logo.svg';
import { Link } from 'react-router-dom';
import { Button } from '../../../ui-components/button/Button';
import { Links } from '../../../utils/constants';
import './header.scss';

export const Header = () => {
    const location = useLocation();
    const currentUrl = location.pathname;

    const linkTemplate = Links.map((link) => {
        const { title, url, id } = link;
        return (
            <Link
                className={classNames('link', currentUrl === url && 'active')}
                to={url}
                key={id}
            >
                {title}
            </Link>
        );
    });

    return (
        <header className='header'>
            <div>
                <img src={Logo} alt='logo' />
            </div>
            <div className='linksContainer'>{linkTemplate}</div>
            <div className='hamburgerMenu'>
                <div className='menuItem' />
                <div className='menuItem' />
                <div className='menuItem' />
            </div>
            <div className='buttonContainer'>
                <Button
                    to='/order-online'
                    size='xl'
                    width='wider'
                    className='button'
                >
                    <div className='buttonChildren'>
                        <MdDeliveryDining className='icon' />
                        <p>Order online</p>
                    </div>
                </Button>
            </div>
        </header>
    );
};
