import React from "react";
import loginImg from "../../../assets/images/icone_clique.png";
import {Redirect} from 'react-router-dom';
import { httpGetRequest } from "../fetch.js";
import "./LogPage.scss";

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      id: -1,
      username: '',
      password: '',
      redirectToReferrer: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  login() {
    if(this.state.username && this.state.password){
      httpGetRequest(`login?password=${this.state.password}&username=${this.state.username}`)
      .then((response) => {
        try {
          const id = parseInt(response);
          this.setState(() => {
            return {
              id: id,
              redirectToReferrer: true
            }
          })
        }catch(err) {
          return false;
        }
      })
      .catch((err) => {
      })
    }
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')){
      return (<Redirect to={{
        pathname: '/game/home',
        state: {id: this.state.id},
      }}/>)
      
    }
    return (
      <div className="login base-container" ref={this.props.containerRef}>
        <div className="header">Connexion</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt=""/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.onChange}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <input className="btn" type="submit" value="Login" onClick={this.login}/>
        </div>
      </div>
    );
  }
}

export default Login;
