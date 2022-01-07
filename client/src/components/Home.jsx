import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterCreated, orderByName, orderByWeight, getTemps, filterTemps} from '../actions/index'
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado'
import SearchBar from './SearchBar';
import styles from './Home.module.css'


export default function Home() {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperament)
    const [orden, setOrden] = useState('');
    const [temperament,setTemperament] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage; // 6 
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs?.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        if(temperament){
            dispatch(filterTemps(temperament))
        }
        else{
            dispatch(getTemps())
            dispatch(getDogs())
        }
        
    }, [dispatch, temperament])

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

    function handleTemperament(e){
    
        setTemperament(e.target.value)
        // dispatch(filterTemps(temperament)); 
        
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

               
                <select onChange={e=> handleTemperament(e)} value={temperament}>
                    <option value="">Temperamentos</option>
                    {allTemperaments?.map((temp)=> (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                </select>

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
                    allDogs={allDogs?.length}
                    paginado={paginado}
                />

                <div className={styles.contGrid}>

                {
                    currentDogs?.map((el) => {

                        return (
                            <div key={el.id} className={styles.cartas}>
                                <Link to={"/home/" + el.id}>
                                    <Card name={el.name} image={el.image} weight={el.weight} temperament={el.temperament ? el.temperament : el?.Temperaments?.map((el => el?.name + " "))}></Card>
                                </Link>
                            </div>
                        )
                    })
                }
                </div>

            </div>

        </div>

    )
}
