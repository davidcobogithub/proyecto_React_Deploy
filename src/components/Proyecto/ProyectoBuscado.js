import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';

class ProyectoBuscado extends Component {

  constructor() {
    super();
    this.state = {

      nombreProyConst: "",
      estadoProyConst:null,
      proy:null,
      redir:null
      
    }
  }

  componentWillMount() {
    this.verificarProyectoEnRojo();

    this.setState({

      proy:this.props.proyectoParam
    });
  }


  handleClickVerDetalles(e){
    
    localStorage.setItem("nomProyecto", this.state.proy.nombre)
    localStorage.setItem("descProyecto", this.state.proy.descripcion)
    localStorage.setItem("responProyecto", this.state.proy.responsable)
    localStorage.setItem("fechaIniProyecto", this.state.proy.fecha_inicio)
    localStorage.setItem("fechaFinProyecto", this.state.proy.fecha_fin)
    localStorage.setItem("estadoProyecto", this.state.proy.estado)
    localStorage.setItem("tareasProyecto", JSON.stringify(this.state.proy.tareas))
    localStorage.setItem("proyectoNuevaTarea", JSON.stringify(this.state.proy))

    this.setState({
        redir: <Redirect to='/proyectoDetalles'>
        </Redirect>
      });
    
  }

  verificarProyectoEnRojo(){
    
    var date = new Date()
    var dateFormat=this.convertDateFormat(date.toLocaleDateString()).toString()

    if(this.props.proyectoParam.estado !== "TERMINADO" && 
     this.props.proyectoParam.fecha_fin < dateFormat){

      this.setState({
        estadoProyConst:   <li className="list-group-item barra-busqueda rojo">
        {"Nombre: " + this.props.proyectoParam.nombre}
        <br/>
        {"Fecha de Inicio: " +this.props.proyectoParam.fecha_inicio}
        <br/>
        {"Fecha de Entrega: " +this.props.proyectoParam.fecha_fin}
        <br/>
        {"Estado: " +this.props.proyectoParam.estado}
        <br/>
        <br/>
        <button type="button" className="btn btn-info" onClick={this.handleClickVerDetalles.bind(this)}>Ver Detalles</button>
      </li>
      });
    }
    else{

      this.setState({
        estadoProyConst:<li className="list-group-item barra-busqueda">
        {"Nombre: " + this.props.proyectoParam.nombre}
        <br/>
        {"Fecha de Inicio: " +this.props.proyectoParam.fecha_inicio}
        <br/>
        {"Fecha de Entrega: " +this.props.proyectoParam.fecha_fin}
        <br/>
        {"Estado: " +this.props.proyectoParam.estado}
        <br/>
        <br/>
        <button type="button" className="btn btn-info" onClick={this.handleClickVerDetalles.bind(this)} >Ver Detalles</button>
      </li>
      });
    }
  }

  convertDateFormat(string) {
    var info = string.split('/');
    return info[2] + '-' + info[1] + '-' + info[0];
  }

  render() {

    return (
      <div className="ProyectoBuscado container">

        {this.state.estadoProyConst}
        {this.state.redir}
      </div>
    );
  }
}

export default ProyectoBuscado;
