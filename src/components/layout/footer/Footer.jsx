import React from 'react';
import { Link } from 'react-router-dom';
import { Links, OpenHours } from '../../../utils/constants';
import Logo from '../../../assets/logo/logo.svg';
import './footer.scss';

export const Footer = () => {
    const linkTemplate = Links.map((link) => {
        const { title, url, id } = link;
        return (
            <Link className='link' to={url} key={id}>
                {title}
            </Link>
        );
    });

    const openHoursTemplate = OpenHours.map((obj) => {
        const { days, time, id } = obj;

        return (
            <div className='openHours' key={id}>
                <p className='days'>{days}:</p>
                <p className='time'>{time}</p>
            </div>
        );
    });

    return (
        <footer className='footer'>
            <div className='logoContainer'>
                <img src={Logo} alt='logo' />
            </div>
            <div className='linkContainer'>{linkTemplate}</div>
            <div className='openHoursContainer'>{openHoursTemplate}</div>
            <div className='contactInfoContainer'>
                <div className='contactInfo'>
                    <p>Crust@Exempel.com</p>
                    <p>+46783457588</p>
                </div>

                <div className='adress'>
                    <p>Stockholm</p>
                    <p>125 57 Älvsjö</p>
                    <p>Testvägen 40</p>
                </div>
            </div>
        </footer>
    );
};
