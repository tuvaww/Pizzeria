import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header/Header';
//import { Footer } from './footer/Footer';
import './layout.scss';
export const Layout = () => {
    return (
        <main className='main'>
            <Header />
            <div className='outlet'>
                <Outlet />
            </div>
            {/*             <Footer />
             */}{' '}
        </main>
    );
};
