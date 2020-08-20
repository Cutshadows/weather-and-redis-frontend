
import {
    BUSCAR_CIUDAD,
    BUSCAR_CIUDAD_EXITO,
    BUSCAR_CIUDAD_ERROR
} from '../types';

import clientAxios from '../config/axios';


export  function  buscarCiudadAction(busqueda){
    return async(dispatch)=>{
        dispatch(buscarCiudad());
        try {
            const resultBusqueda=await clientAxios.post('/search', busqueda);
            const minTemp=parseFloat((5/9)*(resultBusqueda.data.bresult.min-32), 10).toFixed(1);
            const maxTemp=parseFloat((5/9)*(resultBusqueda.data.bresult.max-32), 10).toFixed(1);
            const temp_actual=parseFloat((5/9)*(resultBusqueda.data.bresult.temp_actual-32), 10).toFixed(1);
            resultBusqueda.data.bresult.min=minTemp;
            resultBusqueda.data.bresult.max=maxTemp;
            resultBusqueda.data.bresult.temp_actual=temp_actual;
            dispatch(buscarCiudadExito(resultBusqueda.data.bresult))
        } catch (error) {
            dispatch(buscarCiudadError(true))
        }
    }
}

const buscarCiudad =()=>({
    type: BUSCAR_CIUDAD,
})

const buscarCiudadExito=busqueda=>({
    type:BUSCAR_CIUDAD_EXITO,
    payload:busqueda
});

const buscarCiudadError=estado=>({
    type: BUSCAR_CIUDAD_ERROR,
    payload:estado
})