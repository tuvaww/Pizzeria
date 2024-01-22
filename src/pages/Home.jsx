import React from 'react';
import './home.scss';
import Pizza from '../assets/images/pizza_half.png';
export const Home = () => {
    return (
        <div className='homeContainer'>
            <div className='header'>
                <img className='headerImg' src={Pizza} alt='pizza' />
            </div>
        </div>
    );
};
