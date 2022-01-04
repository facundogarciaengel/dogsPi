import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'; 
import { getNameDog} from "../actions";
import styles from './SearchBar.module.css'


export default function SearchBar() {
     const dispatch = useDispatch()
     const [name, setName] = useState('')

     function handleInputChange(e) {
        e.preventDefault(); 
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameDog(name))
        setName(""); 

    }


    return (
        <div className={styles.divBuscador}>
        <form onSubmit={handleSubmit}>
            <input
            onChange={(e) => handleInputChange(e)}
            type= 'text'
            placeholder="Ingresar Busqueda..."
            value={name}
            />
            {/*<button  onClick={(e)=> handleSubmit(e)} type="submit">Buscar</button> */}
            <button type="submit">Buscar Raza</button>
        {/* //</div> */}
        </form>
        </div>
    )
}
