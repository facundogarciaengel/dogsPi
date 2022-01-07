import React from "react";
import { getDetail } from "../actions/index";
import { useDispatch, useSelector } from 'react-redux'; 
import {Link} from 'react-router-dom'; 
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import styles from './Detail.module.css'


export default function Detail(props) {
    console.log("las props que pasamos a Detail son:" , props)
    const dispatch = useDispatch()
    const { id } = useParams();
    //const [loading, setLoading] = useState(true);
   useEffect(()=> {
       dispatch(getDetail(id));  
        
   },[dispatch])

   const myDog = useSelector((state) => state.detail)

    return (
        <div className={styles.cardContainer}>
            {
                myDog.length > 0 ? 
                <div className={styles.caja}>
                    <h1 className={styles.cardTitle}>{myDog[0].name}</h1>
                    <img className={styles.cardImg} src={myDog[0].image} alt = ""/>
                    <h3>Altura: {myDog[0].height} cm</h3>
                    <h3>Peso: {myDog[0].weight} kg</h3>
                    <h4>Esperanza de vida: {myDog[0].life_span} años</h4>
                    <h5>Temperamento: {!myDog[0].createdInDb? myDog[0].temperament + " " : myDog[0].Temperaments.map((el => el?.name + " "))}</h5>
                    </div> : <p>...Loading</p>
            }
            <Link to='/home'>
                <button className={styles.btnVolver}>Volver</button>
            </Link>
        </div>
    )
}

   