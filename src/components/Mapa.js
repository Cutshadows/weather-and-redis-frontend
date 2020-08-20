import React, {useState, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    //Marker,
   // InfoWindow,
  } from "@react-google-maps/api";
  import {formatRelative} from 'date-fns';
  import mapStyles from "../assets/styles/mapStyles";
  import {buscarCiudadAction } from '../actions/busquedaActions';

  const libraries=['places'];
  const mapContainerStyle={
    height: "99vh",
    width: "99vw",
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: false,
  };

  const center = {
    lat: -35.675147,
    lng: -71.542969,
  };

  

const Mapa = () => {

  const dispatch=useDispatch();
  const busquedaCiudad=(busqueda)=>dispatch(buscarCiudadAction(busqueda));
    const { isLoaded, loadError } = useLoadScript({
       googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
       libraries,
    });
    
 
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const busqueda=useSelector(state=>state.busqueda.busqueda);
    console.log(busqueda);
    //submitBusqueda
    const onClickBusqueda=information=>{
      //console.log(information)
        //e.preventDefault();

        //validar

        //si no hay errores enviar
        busquedaCiudad(information);
    }
    const onMapClick=useCallback((event)=>{
      setMarkers(
        (current)=>[{
          lat:event.latLng.lat(),
          lng:event.latLng.lng(),
          time: new Date().toISOString()
        }]
      );
      onClickBusqueda([{
        lat:event.latLng.lat(),
        lng:event.latLng.lng(),
        time: new Date().toISOString()
      }]);
    }, [])
    const mapRef=useRef();
    const onMapLoad=useCallback((map)=>{
      mapRef.current=map;
    }, []);
 
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "loading maps";


    return ( 
        <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        >
        {
          markers.length!==0?
                  <Marker
                   key={`${markers[0].lat}-${markers[0].lng}`} 
                   // key={markers[0].time} 
                    position={{lat:markers[0].lat, lng:markers[0].lng}}
                    onClick={()=>{
                      setSelected(busqueda);
                    }}
                    icon={{
                      url:'/map_pin.svg',
                      scaledSize:new window.google.maps.Size(60, 40),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(18, 18)
                    }}
                    />
          :null
        }

        {
          selected ? (
          <InfoWindow 
          position={{lat:selected.lat, lng:selected.lng}}
          onCloseClick={()=>{
            setSelected(null);
          }}>
            <div>
              <p className="h1 alert alert-danger"> {selected.id} </p>
                <p className="h3">
                  Minima: {selected.min} <span>&#x2103;</span>
                </p>
                <p className="h3">
                  Maxima: {selected.max} <span>&#x2103;</span>
                </p>
                <p className="h3">
                  Temperatura Actual: {selected.temp_actual} <span>&#x2103;</span>
                </p>
            </div>
          </InfoWindow>
        ):null}
        </GoogleMap>
     );
}
 
export default Mapa;