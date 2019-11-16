import React from "react";
import "./LogPage.scss";
import loginImg from "../../../assets/images/icone_clique.png";
import {Redirect} from 'react-router-dom';
import { httpGetRequest } from "../fetch.js";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      id: -1,
      redirectToHome: false,
    }
    this.username = this.username.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.register = this.register.bind(this);
  }
  username(event) {
  this.setState({ username: event.target.value })
  }
  email(event) {
    this.setState({ email: event.target.value })
  }
  password(event) {
    this.setState({ password: event.target.value })
  }
  register() {
    httpGetRequest(`register?email=${this.state.email}&username=${this.state.username}&password=${this.state.password}`)
    .then((result) => {
      console.log(result)
      if (result.Status === 'success')
        this.setState(() => {
          return {
            id: result.id,
            redirectToHome: true,
          }
        })
      else
        alert('désolé mais ce compte existe déjà !')
    });
  }
  
  render() {
    if (this.state.redirectToHome){
      return (<Redirect to={{
        pathname: '/game/home',
        state: {id: this.state.id},
      }}/>)
    }

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Créer un compte</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt=""/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input type="text" name="username"  onChange={this.username} placeholder="Nom d'utilisateur" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" onChange={this.email} placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" name="password"  onChange={this.password} placeholder="Mot de passe" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" onClick={this.register} className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}


export default Register;
