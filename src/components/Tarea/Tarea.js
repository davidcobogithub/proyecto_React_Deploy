import React, { Component } from 'react';
import firebase from '../Firebase'
import {Redirect} from 'react-router-dom';

class Tarea extends Component {

  constructor() {
    super();
    this.state = {

      nombreTarConst: "",
      descripcionTarConst: "",
      prioridadTarCons: "",

      proyConst: [],
      tareaConst: [],
      tareasDeProyecto: [],
      db: firebase.firestore()
    }

    const settings = { timestampsInSnapshots: true }
    this.state.db.settings(settings);
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {

    var proy = [];
    var idProys = [];

    this.state.db.collection("proyectos").get().then((querySnapShot) => {

      querySnapShot.forEach(doc => {
        idProys.push(doc.id);
        proy.push(doc.data());
      });

      this.setState({
        proyConst: proy
      });

    });
  }

  onGuardar(e) {

    var proyTar = JSON.parse(localStorage.getItem("proyectoNuevaTarea"));

    if (this.state.nombreTarConst !== "" && this.state.descripcionTarConst !== ""
      && this.state.prioridadTarCons !== "SELECCIONE PRIORIDAD") {

      e.preventDefault();

      var tareaNueva = {

        nombre: this.state.nombreTarConst,
        descripcion: this.state.descripcionTarConst,
        prioridad: this.state.prioridadTarCons
      }

      this.state.db.collection("proyectos").get().then((querySnapShot) => {

        var tarProyects = [];

        querySnapShot.forEach(doc => {

          if (doc.data().nombre === proyTar.nombre) {

            tarProyects=doc.data().tareas;
            tarProyects.push(tareaNueva);
        
            this.state.db.doc("/proyectos/" + doc.id).update({
              tareas: tarProyects
            });

          }
        });

      });

      this.mensaje("Se agregó nueva tarea correctamente")

      this.setState({

        nombreTarConst:"",
        descripcionTarConst:"",
        prioridadTarCons:""      
      });
    } else {
      this.mensaje("Para agregar una nueva tarea debe llenar todos los campos del formulario")
    }
  }

  mensaje(msm) {

    alert(msm);
  }

  updateInput(e) {

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {

    if(localStorage.getItem("varSesion")!==""){

    return (
      <div className="Tarea container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/proyectos"><i className="fas fa-wrench fa-2x"></i><i className="fas fa-toolbox fa-2x"></i> HOME Management Tool</a>

              <ul className="navbar-nav ml-auto my-lg-0">
              
                <li className="nav-item">
                <a className="nav-link" href="/login"><i className="fas fa-power-off"></i> Cerrar Sesión</a>
                </li>
        
           </ul>

          </nav>
        <form className="form-nuevoProy" onSubmit={this.onGuardar.bind(this)}>

          <div className="form-group">
            <input type="text" className="form-control" placeholder="Nombre" name="nombreTarConst" value={this.state.nombreTarConst}
              onChange={this.updateInput.bind(this)} />
          </div>
          <div className="form-group">

            <input type="text" className="form-control" placeholder="Descripción" name="descripcionTarConst" value={this.state.descripcionTarConst}
              onChange={this.updateInput.bind(this)} />
          </div>
          <div className="form-group">
            <select className="form-control" name="prioridadTarCons" value={this.state.prioridadTarCons} onChange={this.updateInput.bind(this)}>
              <option>SELECCIONE PRIORIDAD</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <button className="btn btn-primary">Agregar</button>

        </form>
      </div>
    );
  }else{

    return(
      <Redirect to="/login"/>
      );
  }
}
}

export default Tarea;
