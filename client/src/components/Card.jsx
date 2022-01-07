import React from "react";
import styles from './Card.module.css'
export default function Card({name, image, weight, temperament}) {
    
    return (
        <div className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>{name}</h3>
            <h5>{weight} kg</h5>
            <h4>Temperamento: {temperament} </h4>
            <img  href='#/' className={styles.cardImg} src={image} alt="img not found" width="200px" height="220px" border="1px"></img>
        </div>
    )
}

