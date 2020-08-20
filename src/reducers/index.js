import {combineReducers} from 'redux';
import busquedaReducer from './busquedaReducer';


export default combineReducers({
    busqueda: busquedaReducer
});