import React, { Component } from 'react';
import firebase from '../Firebase'


class Login extends Component {

  constructor() {
    super();

    localStorage.setItem("varSesion", "")

    this.state = {

      usuarioConst: "",
      passwordConst: "",
      usuariosConst: [],
      db: firebase.firestore()
    }

    const settings = { timestampsInSnapshots: true }
    this.state.db.settings(settings);
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {

    this.state.db.collection("usuarios").get().then((querySnapShot) => {

      var tasks = [];

      querySnapShot.forEach(doc => {

        tasks.push(doc.data());
    
      });

      this.setState({

        usuariosConst: tasks
      });

    });


  }

  handleIngresarSistema(e) {

    this.state.usuariosConst.forEach(element => {

      if (this.state.usuarioConst === element.usuario && this.state.passwordConst === element.password) {
        localStorage.setItem("varSesion", this.state.usuarioConst)

        this.props.history.push('/proyectos')
        
      }
      else {
        this.mensaje("Error! Los datos ingresados no son correctos");
        this.props.history.push('/login');
      }
    });

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

    return (
      <div className="Login">
      <h1>BIENVENIDO A MANAGEMENT TOOL</h1>
      <br/>
      <br/>
      <br/>
        <form>
          <div className="form-group">
      
            <input type="text" className="form-control" placeholder="Usuario" name="usuarioConst" value={this.state.usuarioConst}
              onChange={this.updateInput.bind(this)} />
          </div>

          <div className="form-group">

            <input type="password" className="form-control" placeholder="Contraseña" name="passwordConst" value={this.state.passwordConst}
              onChange={this.updateInput.bind(this)} />
          </div>
          <button className="btn btn-primary btn-lg" onClick={this.handleIngresarSistema.bind(this)}>Ingresar</button>
        </form>
   
      </div>
    );
  }
}

export default Login;
