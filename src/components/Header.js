import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {buscarCiudadAction } from '../actions/busquedaActions';

const Header = () => {

    const dispatch=useDispatch();
    const busquedaCiudad=(busqueda)=>dispatch(buscarCiudadAction(busqueda) );
    const [ciudad, setCiudad] =useState('');
    //submitBusqueda
    const submitBusqueda=e=>{
        e.preventDefault();

        //validar
        if(ciudad.trim===''){
            return;
        }


        //si no hay errores enviar
        busquedaCiudad({
            ciudad
        });
    }
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
            <div className="container">
                <h1>Weather & Redis</h1>
                <form
                    className="form-inline my-2 my-lg-0"
                    onSubmit={submitBusqueda}>
                    {/* <div className="row">
                        <div className="col-md-12">
                            <input 
                                type="text"
                                name="ciudad"
                                value={ciudad} 
                                className="form-control mr-sm-2"
                                placeholder="Search city"
                                onChange={e=>setCiudad(e.target.value)}
                                />

                            <input
                                type="submit"
                                value="Search"
                                style={{float:"right"}} 
                                className="btn btn-danger d-block d-md-inline-block my-2 my-sm-0"/>
                        </div>
                    </div> */}
                </form>

            </div>
        </nav>
     );
}
 
export default Header;