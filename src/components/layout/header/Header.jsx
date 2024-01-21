import React from 'react';
import { MdDeliveryDining } from 'react-icons/md';

import Logo from '../../../assets/logo/logo.svg';
import { Link } from 'react-router-dom';
import './header.scss';
import { Button } from '../../../ui-components/button/Button';

export const Header = () => {
    const links = [
        { id: 1, title: 'Home', url: '/' },
        { id: 2, title: 'Our menu', url: '/menu' },
        { id: 3, title: 'Reservation', url: '/reservation' },
        { id: 4, title: 'Career', url: '/career' },
    ];

    const linkTemplate = links.map((link) => {
        const { title, url, id } = link;
        return (
            <Link className='link' to={url} key={id}>
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
                <Button to='/order-online' className='button'>
                    <div className='buttonChildren'>
                        <MdDeliveryDining className='icon' />
                        <p>Order online</p>
                    </div>
                </Button>
            </div>
        </header>
    );
};
