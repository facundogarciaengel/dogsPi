//import { getDogs, getTemps, filterCreated, orderByName, getNameDog, postDog, getDetail } from "../actions";
import { GET_DOGS, GET_TEMPS, FILTER_CREATED, ORDER_BY_NAME, GET_NAME_DOG , POST_DOG, GET_DETAILS, ORDER_BY_WEIGHT} from '../actions/index.js'

const initialState = {
    dogs: [],
    allDogs: [],
    temperament: [],
    allTemperaments: [],
    detail: []

}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        //case GET_TEMPS:
          case GET_TEMPS: 
          return {
              ...state, 
              temperament: action.payload
          } 
       
        case FILTER_CREATED:

            const createdFilter = action.payload === 'created' ? state.allDogs.filter(el => el.createdInDb)
                : state.allDogs.filter(el => !el.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : createdFilter
            }

        case ORDER_BY_NAME:

            let ordenDeArr = action.payload === 'asc'? 
            state.dogs.sort(function (a,b) {
                if(a.name > b.name){
                    return 1
                } if (b.name > a.name){
                    return -1;
                }
                return 0
            }): 
            state.dogs.sort(function (a,b) {
                if(a.name > b.name){
                    return -1
                }if(b.name > a.name){
                    return 1
                }
                return 0
            })
            return {
                ...state, 
                dogs: ordenDeArr
            }
            case POST_DOG: 
            return {
                ...state
            }

            case GET_NAME_DOG: 
                return{
                    ...state, 
                    dogs: action.payload
                }
                case GET_DETAILS: 
                return {
                    ...state,
                    detail: action.payload
                }

                case ORDER_BY_WEIGHT: 
                
               let orderWeight = action.payload === "weight_min"? 
                state.dogs.sort((a, b) => {
                   // console.log("a es :", a, "b es :", b)
                    //console.log("a.weight[0]", a.weight.split("-")[0], "a.weight[1]", a.weight.split("-")[1]); 
                    //console.log("b.weight[0]", b.weight.split("-")[0], "b.weight[1]", b.weight.split("-")[1])
                    //console.log("longitud de a[1]:", a.weight.split("-")[1].length)
                    //console.log("longitud de b[1]:", b.weight.split("-")[1].length)

                    if (typeof a.weight.split("-")[0] !== 'undefined' &&
                        typeof b.weight.split("-")[0] !== 'undefinded') {
                        // Ahora sabemos que foo está definido, ahora podemos continuar.
                      
                    if (Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])) return 1;
                    if (Number(a.weight.split("-")[0]) < Number(b.weight.split("-")[0])) return -1;
                        }
                    return 0;
                  }):
                  action.payload === "weight_max"?
                    state.dogs.sort((b, a) => {
                      
                        if (typeof a.weight.split("-")[1] !== 'undefined' &&
                        typeof b.weight.split("-")[1] !== 'undefinded') {
                        // Ahora sabemos que foo está definido, ahora podemos continuar.
                      
                    if (Number(a.weight.split("-")[1]) > Number(b.weight.split("-")[1])) return 1;
                    if (Number(a.weight.split("-")[1]) < Number(b.weight.split("-")[1])) return -1;
                        }
                    return 0;
                  }): 
                   state.allDogs

                  return {
                      ...state, 
                      dogs: orderWeight
                  }


            // case ORDER_BY_WEIGHT: 
            // console.log(state.dogs[0].split(',')[0]); 
            // let ordenDeArr2 = action.payload === 'asc weight'? 
            // state.dogs.sort(function (a,b) {
            //     if(a.weight.split(',')[0] > b.weight.split(',')[1]){
            //         return 1
            //     } if(b.weight.split(',')[0] > a.weight.split(',')[0]){
            //         return -1
            //     }
            //     return 0
            // }) : 
            // state.dogs.sort(function (a,b){
            //     if(a.weight.split(',')[0] > b.weight.split(',')[0]){
            //         return -1
            //      } if(b.weight.split(',')[0]>a.weight.split(',')[0]){
            //          return 1
            //      }
            //      return 0
            // })
            // return {
            //     ...state,
            //     dogs: ordenDeArr2
            // }

        default:
            return state;
    }
}


export default rootReducer; 