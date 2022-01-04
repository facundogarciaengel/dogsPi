import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterCreated, orderByName, orderByWeight} from '../actions/index'
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado'
import SearchBar from './SearchBar';
import styles from './Home.module.css'


export default function Home() {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    console.log(allDogs);
    const allTemps = useSelector((state) => state.temperament)
    console.log("allTemps:", allTemps);
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage; // 6 
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    // useEffect(()=> {
    //     dispatch(getTemps())
    // }, [dispatch]); 


    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)

    }

    function  handleSortByWeight(e) {
        e.preventDefault(); 
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Link  className={styles.a} to='/dog'>Crear Raza</Link>
            <h1 className={styles.h1}>Bienvenido a Henry Dogs</h1>
            <button onClick={e => { handleClick(e) }}>Volver a cargar todos los perros</button>
            <div>

            <SearchBar className={styles.divBuscador} />

                <select onChange={e => handleSort(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>


                {/* <select onChange={e => handleSortByWeight(e)}>
                    <option value='asc weight'>Peso Ascendente</option>
                    <option value ='desc weight'>Peso Descendente</option>
                </select> */}
                {/*                 
                <select>
                <option value={allTemps}>Temperament</option>
            </select> */}

                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All">Todos</option>
                    <option value="created">Creado</option>
                    <option value="api">Existente</option>
                </select>

                <select onChange={(e) => handleSortByWeight(e)}>
            <option value="Weight">Peso</option>
          <option value="weight_min">Peso min</option>
          <option value="weight_max">Peso max</option>
        </select>


               

                <Paginado
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />



                {
                    currentDogs?.map((el) => {

                        return (
                            <div className={styles.cartas}>
                                <Link to={"/home/" + el.id}>
                                    <Card name={el.name} image={el.image} weight={el.weight} temperament={el.temperament ? el.temperament : el?.Temperaments?.map((el => el?.name + " "))} key={el.id}></Card>
                                </Link>
                            </div>
                        )
                    })
                }

            </div>

        </div>

    )
}
