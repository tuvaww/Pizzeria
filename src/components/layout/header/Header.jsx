import React from 'react';
import Logo from '../../../assets/logo/logo.svg';
import { Link } from 'react-router-dom';
import './header.scss';

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
            <div>{linkTemplate}</div>
            <div></div>
        </header>
    );
};
