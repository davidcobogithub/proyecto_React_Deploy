import React, { Component } from 'react';
import firebase from '../Firebase'
import { Redirect } from 'react-router-dom';

class ProyectoNuevo extends Component {

  constructor() {
    super();
    this.state = {

      nombreProyConst: "",
      descripcionProyConst: "",
      responsableProyCons: "",
      fechaIniProyCons: "",
      fechaFinProyCons: "",
      estadoProyConst: "",
      tareaProyConst: "",

      tareasAddProyCons: [],
      proyectoNuevoConst: null,
      tareasConst: [],

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
    var tar = [];
    var tarNotDupli = [];

    Array.prototype.unique = function (a) {
      return function () { return this.filter(a) }
    }(function (a, b, c) {
      return c.indexOf(a, b + 1) < 0
    });

    this.state.db.collection("proyectos").get().then((querySnapShot) => {

      querySnapShot.forEach(doc => {

        proy.push(doc.data());
      });

      proy.forEach(element => {
        element.tareas.forEach(item => {
          tar.push(item);
        });
      });

      tarNotDupli = this.removeDuplicates(tar, "nombre")
      tarNotDupli.pop()

      this.setState({
        tareasConst: tarNotDupli
      });

    });
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  onGuardar(e) {

    if (this.state.nombreProyConst !== "" && this.state.descripcionProyConst !== "" && this.state.responsableProyCons !== "" && this.state.fechaIniProyCons !== "" && this.state.fechaFinProyCons !== "" && this.state.estadoProyConst !== "SELECCIONE ESTADO" && this.state.tareaProyConst !== "SELECCIONE TAREA") {

      if (this.state.fechaIniProyCons < this.state.fechaFinProyCons) {

              this.state.tareasConst.forEach(item => {

                if (item.nombre === this.state.tareaProyConst) {
      
                  this.state.tareasAddProyCons.push(item)
      
                }
      
              });
      
              this.state.db.collection("proyectos").add({
      
                nombre: this.state.nombreProyConst,
                descripcion: this.state.descripcionProyConst,
                responsable: this.state.responsableProyCons,
                fecha_inicio: this.state.fechaIniProyCons,
                fecha_fin: this.state.fechaFinProyCons,
                estado: this.state.estadoProyConst,
                tareas: this.state.tareasAddProyCons
              });
      
              this.mensaje("Se agregó nuevo proyecto correctamente")
      
              this.setState({
      
                nombreProyConst: "",
                descripcionProyConst: "",
                responsableProyCons: "",
                fechaIniProyCons: "",
                fechaFinProyCons: "",
                estadoProyConst: "SELECCIONE ESTADO",
                tareaProyConst: "SELECCIONE TAREA"
      
              });
            
      }
      else {
        this.mensaje("La fecha de inicio no puede ser mayor a la fecha de entrega del proyecto")
      }
    } else {
      this.mensaje("Para agregar un nuevo proyecto debe llenar todos los campos del formulario")
    }
  }

  updateInput(e) {

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  mensaje(msm) {

    alert(msm);
  }

  render() {

    if (localStorage.getItem("varSesion") !== "") {

      var tareasOpt = this.state.tareasConst.map(task => {

        return <option key={task.nombre}>{task.nombre}</option>;

      });

      return (
        <div className="ProyectoNuevo container">
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/proyectos"><i className="fas fa-wrench fa-2x"></i><i className="fas fa-toolbox fa-2x"></i> HOME Management Tool</a>

              <ul className="navbar-nav ml-auto my-lg-0">
              
                <li className="nav-item">
                <a className="nav-link" href="/login"><i className="fas fa-power-off"></i> Cerrar Sesión</a>
                </li>
        
           </ul>

          </nav>
          <form className="form-nuevoProy" onSubmit={this.onGuardar.bind(this)}>

            <div className="form-group ">
              <input type="text" className="form-control" placeholder="Nombre" name="nombreProyConst" value={this.state.nombreProyConst}
                onChange={this.updateInput.bind(this)} />
            </div>
            <div className="form-group">

              <input type="text" className="form-control" placeholder="Descripción" name="descripcionProyConst" value={this.state.descripcionProyConst}
                onChange={this.updateInput.bind(this)} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Responsable" name="responsableProyCons" value={this.state.responsableProyCons}
                onChange={this.updateInput.bind(this)} />
            </div>

            <div className="row form-group">
              <div className="col-lg-4">
                <p> Fecha de Inicio</p>
              </div>
              <div className="col-lg-8">
                <input className="form-control" type="date" name="fechaIniProyCons" value={this.state.fechaIniProyCons} onChange={this.updateInput.bind(this)}></input>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-lg-4">
                <p> Fecha de Entrega</p>
              </div>
              <div className="col-lg-8">
                <input className="form-control" type="date" name="fechaFinProyCons" value={this.state.fechaFinProyCons} onChange={this.updateInput.bind(this)}></input>
              </div>
            </div>
            <div className="form-group">
              <select className="form-control" name="estadoProyConst" value={this.state.estadoProyConst} onChange={this.updateInput.bind(this)}>
                <option>SELECCIONE ESTADO</option>
                <option>EN PROCESO</option>
                <option>TERMINADO</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-control" name="tareaProyConst" value={this.state.tareaProyConst} onChange={this.updateInput.bind(this)}>
                <option>SELECCIONE TAREA</option>
                {tareasOpt}
              </select>
            </div>
            <button className="btn btn-primary">Agregar</button>
            <br />
            <br />
          </form>
        </div>
      );
    }
    else {

      return (
        <Redirect to="/login" />
      );
    }
  }

}

export default ProyectoNuevo;
