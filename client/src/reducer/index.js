import { getDogs } from "../actions";
import { GET_DOGS } from '../actions/index.js'

const initialState = {
    dogs : [],
    allDogs: []
    
}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_DOGS:
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload
        } 

        default:
            return state;   
      }}

      
export default rootReducer; 