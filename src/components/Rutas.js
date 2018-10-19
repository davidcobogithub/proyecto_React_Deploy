import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Proyecto from './Proyecto/Proyecto'
import ProyectoDetalles from './Proyecto/ProyectoDetalles'
import Tarea from './Tarea/Tarea'
import Login from './Login/Login'
import ProyectoNuevo from './Proyecto/ProyectoNuevo'


const AppRoutes = () =>
    <Switch>
     
     <Redirect from="/login" to="/"/>
      <Route exact path="/"  component={Login}/>
      <Route exact path="/proyectoDetalles"  component={ProyectoDetalles}/>
      <Route exact path="/proyectos"  component={Proyecto}/>
      <Route exact path="/tareas" component={Tarea}/>
      <Route exact path="/proyectoNuevo" component={ProyectoNuevo}/>
    </Switch>
export default AppRoutes;