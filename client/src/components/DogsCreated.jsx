import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

//import { useHistory } from 'react-router-dom'; 

import { postDog, getTemps } from '../actions/index';

import { useDispatch, useSelector } from 'react-redux';

import styles from './DogsCreated.module.css'

// var validateFunc = function validate(input){
//     let errors = {}
//     if(!input.name){
//         errors.name = "Se requiere un Nombre de raza"
//     } 
//     else if(!input.weight){
//         errors.name = "Se requiere un peso"
//     }
//     return errors; 
// }

export default function DogsCreated() {

    const dispatch = useDispatch()
    //const history = useHistory()

    const temperament = useSelector((state) => state.temperament)

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "", 
        temperament: []
    })
    console.log(input.image); 

    const [errors, setErrors] = useState({})

    
    function handleChange(e) {

        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        // setErrors(validateFunc(input)({
        //     ...input,
        //     [e.target.name] : e.target.value
        // }))
        console.log(input)

    }


    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value ]
        })
        console.log("este es el input de la img:", input);
    }

   


    function handleSubmit(e){
        e.preventDefault();
        if(!input.name || !input.height || !input.weight || !input.life_span) {alert("Campo Obligatorio")}
       
        else{
            dispatch(postDog(input))
            alert("Perro creado!")
            setInput({
                name: "",
                height: "",
                weight: "",
                life_span: "",
                image: "", 
                temperament: []
            })
        }
        console.log('desde front: ',input)
       
        //history.push("/home")
        //window.location.href("/home")
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }

    useEffect(() => {
        dispatch(getTemps());
    }, [])

    

    return (
        <div>
        <div className={styles.contPpal}>
            
            <div className={styles.caja}>
            <h1>Crea una Raza</h1>
            <form onSubmit={(e)=> handleSubmit(e)} className={styles.form}>
                <div className={styles.nombre}>
                    <label>Nombre: </label>
                    <input
                        type='text'
                        value={input.name}
                        name="name"
                        onChange={(e)=>handleChange(e)}
                    />
                    {/* {errors.name && ( 
                        <p className='error'>{errors.name}</p>
                    ) } */}
                </div>
                <div className={styles.alturas}>
                    <label>ALtura:</label>
                    <input
                        type='text'
                        value={input.height}
                        name="height"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className={styles.pesos}>
                <label>Peso:</label>
                    <input
                        type='text'
                        value={input.weight}
                        name="weight"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className={styles.life_span}>
                <label>Esperanza de Vida:</label>
                    <input
                        type='text'
                        value={input.life_span}
                        name="life_span"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className={styles.image}>
                <label>Imagen:</label>
                    <input
                        type='url'
                        value={input.image}
                        name="image"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <select onChange={(e)=> handleSelect(e)}>
                    {temperament.map((temp)=> (
                        <option value={temp.name}>{temp.name}</option>
                    ))}
                </select>
               <ul><li>{input.temperament.map(temp => temp + " ,")}</li></ul>
                <button type='submit' className={styles.button} >Crear Raza</button>
            </form>
            {
                input.temperament.map(el=> 
                    <div className={styles.divTemp}>
                        <button className={styles.botonX} onClick={()=> handleDelete(el)}>x</button>
                        <p>{el + "-"}</p>
                        
                    </div>
                        )
            }
            </div>
           
        </div>
        <div className={styles.divVolver}>
            <Link to='/home'><button className={styles.button}>Volver</button></Link>
            </div>
        </div>
        
    )
}
