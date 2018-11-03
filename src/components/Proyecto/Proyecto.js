import React, { Component } from 'react';
import firebase from '../Firebase'
import ProyectoBuscado from './ProyectoBuscado'
import { Redirect } from 'react-router-dom';

class Proyecto extends Component {

  constructor() {
    super();
    this.state = {

      resul: null,
      nombreProyConst: "",
      proyectosConst: [],
      db: firebase.firestore()
    }

    const settings = { timestampsInSnapshots: true }
    this.state.db.settings(settings);
  }


  componentWillMount() {
    this.refresh();
  }

  refresh() {

    this.state.db.collection("proyectos").get().then((querySnapShot) => {

      var proy = [];

      querySnapShot.forEach(doc => {

        proy.push(doc.data());
      });

      this.setState({

        proyectosConst: proy,

      });

    });
  }

  updateInput(e) {

    this.setState({
      [e.target.name]: e.target.value,
      resul: null
    });

  }

  handleBuscarProyecto(e) {

    var item = null;

    this.state.proyectosConst.forEach(element => {

      if (this.state.nombreProyConst === element.nombre) {

        item = element
      }
    });

    if (item != null) {

      this.setState({
        nombreProyConst: "",
        resul: <ProyectoBuscado proyectoParam={item} />

      });
    }
    else {

      this.mensaje("No se encontraron proyectos con el nombre " + this.state.nombreProyConst);

      this.setState({
        nombreProyConst: "",
        resul: null
      });
    }
  }

  mensaje(msm) {

    alert(msm);
  }

  render() {

    if (localStorage.getItem("varSesion") !== "") {

      return (
        <div className="Proyecto container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/proyectos"><i className="fas fa-wrench fa-2x"></i><i className="fas fa-toolbox fa-2x"></i> HOME Management Tool</a>

              <ul className="navbar-nav ml-auto my-lg-0">
              
                <li className="nav-item">
                <a className="nav-link" href="/login"><i className="fas fa-power-off"></i> Cerrar Sesión</a>
                </li>
        
           </ul>

          </nav>

          <div className="my-4">

            {this.state.proyectosConst.map(task => <li className="list-group-item" key={task.nombre}>Nombre: {task.nombre}<br /></li>)}
          </div>
        
          <div className="form-group">
            <input type="text" className="form-control barra-busqueda" placeholder="Buscar Proyectos Por Nombre" name="nombreProyConst" value={this.state.nombreProyConst}
              onChange={this.updateInput.bind(this)} />
            <br />
            <button className="btn btn-primary btn-buscar" onClick={this.handleBuscarProyecto.bind(this)}>Buscar</button>
            <br />

          </div>
          {this.state.resul}
          <div className="form-group bajar">

            <a className="btn btn-primary btn-buscar" href="/proyectoNuevo">Agregar Nuevo Proyecto</a>
          </div>
          <div></div>

        </div>
      );
    } else {
      return (
        <Redirect to="/login" />
      );
    }

  }
}

export default Proyecto;
