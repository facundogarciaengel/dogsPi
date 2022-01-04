import axios from 'axios'; 
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPS = "GET_TEMPS";
export const FILTER_CREATED = "FILTER_CREATED"; 
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const GET_NAME_DOG = "GET_NAME_DOG"; 
export const POST_DOG = "POST_DOG"; 
export const GET_DETAILS = "GET_DETAILS"; 
 
export function getDogs(){

    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs', {

        });
       
        return dispatch({
            type: GET_DOGS, 
            payload: json.data
        })
    }
    }

    export function getTemps(){
        return async function(dispatch) {
            var info = await axios.get('http://localhost:3001/temperament', {

            }); 

            return dispatch({ type: GET_TEMPS, payload: info.data})

        }
    }

    export function postDog(payload){
        console.log('desde action: ', payload)
        return async function(dispatch){
            const json = await axios.post('http://localhost:3001/dog', payload); 
            return json; 
        }
    }

    export function filterCreated(payload){
        return  {
            type: FILTER_CREATED, 
            payload
        }
    }
export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByWeight(payload){
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function getNameDog(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/dogs?name='+name); 
            return dispatch({
                type: GET_NAME_DOG, 
                payload: json.data

            })
        } 
        catch(error){
            console.log(error)
        }
    }
}
export function getDetail(id) {
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/dogs/'+id)
            console.log(json.data)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}