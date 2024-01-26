import React from 'react';
import PizzaBaker from '../../../assets/images/pizza_baker.jpg';
import { Button } from '../../../ui-components/button/Button';
import styles from './style.module.scss';

export const BuildYourPizza = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Build your own pizza</h2>
            </div>

            <div className={styles.wrapper}>
                <img
                    src={PizzaBaker}
                    alt='pizza baker illustration'
                    className={styles.img}
                />

                <div className={styles.textContainer}>
                    <p>
                        Lorem Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and
                        scrambled it to.
                    </p>

                    <div className={styles.buttonWrapper}>
                        <Button to='/' width='fill'>
                            Lets bake !
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
