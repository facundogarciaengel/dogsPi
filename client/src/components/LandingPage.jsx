import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LangingPage() {
    return (
        <div className={styles.divLPage}>
            <div className={styles.contPpal}>
            <h1>¡Bienvenidos a Henry Dogs!</h1>
            <p>Con Henry Dogs podemos aprender mas sobre nuestros mejores amigos</p>
            <Link to='/home'>
                <button className={styles.boton}>Bienvenidos</button>
            </Link>
            </div>
            <div className={styles.forma}>

            </div>
        </div>
    )
}


