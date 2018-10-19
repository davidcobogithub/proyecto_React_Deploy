import React, { Component } from 'react';
import './App.css';
import Rutas from './components/Rutas'
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
      <div className="App">
      <Rutas></Rutas>

      </div>
      </BrowserRouter>
    );
  }
}

export default App;
