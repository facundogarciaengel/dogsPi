import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDogs} from '../actions'
import { Link } from 'react-router-dom'; 
import Card from './Card';
import Paginado from './Paginado'



export default function Home() {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    console.log(allDogs); 
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(6)
    const indexOfLastDog = currentPage * dogsPerPage; // 6 
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to='/dog'>Crear Raza</Link>
             <h1>Would you like to see beatifull dogs?</h1>
             <button onClick={e => { handleClick(e) }}>Volver a cargar todos los perros</button>
            <div>
            <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>

                <Paginado
                    dogsPerPage={dogsPerPage}
                    allDogs = {allDogs.length}
                    paginado={paginado}
                    /> 


                {
                    currentDogs?.map((el) => {
                        return (
                            <div className='cartas'>
                                <Link to={"/home/" + el.id}>
                                    <Card name={el.name} image={el.image} weight={el.weight} key={el.id}></Card>
                                </Link>
                            </div>
                        )
                    })
                }

            </div>
        
        </div>
        
    )
}
