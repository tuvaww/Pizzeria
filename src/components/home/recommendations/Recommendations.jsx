import React from 'react';
import { Pizzas } from '../../../utils/constants';
import { Button } from '../../../ui-components/button/Button';
import styles from './style.module.scss';

export const Recommendations = () => {
    const recommendedItemTemplate = Pizzas.map((pizza) => {
        const { id, name, price, src } = pizza;
        if (id <= 3) {
            return (
                <div key={id} className={styles.wrapper}>
                    <img
                        className={styles.img}
                        src={require(`../../../assets/images/${src}.jpg`)}
                        alt={name}
                    />
                    <div className={styles.info}>
                        <p>{name}</p>
                        <p>{price}</p>

                        <Button to='/order' size='xs' width='fill'>
                            Order now
                        </Button>
                    </div>
                </div>
            );
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Chefs recommendations</h2>
            </div>
            <div className={styles.itemsContainer}>
                {recommendedItemTemplate}
            </div>
        </div>
    );
};
