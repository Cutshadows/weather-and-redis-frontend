//cada reducer tiene su propio state

import {
    BUSCAR_CIUDAD,
    BUSCAR_CIUDAD_EXITO,
    BUSCAR_CIUDAD_ERROR
} from '../types';


const initialState={
    error:false,
    busqueda:[{
        lat:null,
        lng:null,
        time:null,
    }],
    loading:false
}

export default function(state= initialState, action){
    switch(action.type){
        case BUSCAR_CIUDAD:
            return{
                ...state,
                loading:true
            }
        case BUSCAR_CIUDAD_EXITO:
            return{
                ...state,
                loading:false,
                busqueda:action.payload
            }
        case BUSCAR_CIUDAD_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
};