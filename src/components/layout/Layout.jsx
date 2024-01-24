import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import styles from './style.module.scss';
export const Layout = () => {
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.outlet}>
                <Outlet />
            </div>
            <Footer />
        </main>
    );
};
