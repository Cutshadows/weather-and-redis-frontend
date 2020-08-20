import React, { Fragment } from 'react';
import './assets/styles/App.css';
import Header from './components/Header';
import Mapa from './components/Mapa';
import './assets/styles/index.css';

//redux
import {Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Fragment>
        <Provider store={store} >
          <Header />
          <div className="cuerpo">
              <Mapa />
          </div>
        </Provider>  
    </Fragment>
  );
}

export default App;
