import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

class Parametres extends Component{
    state = {
        redirect: false
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }

    render(){
    

        return(
            <div id="Parametre" class="tabcontent">
                <h3>Paramètres</h3>
                <button class="btnBuy">Mot de passe oublié</button><br/>
                <button class="btnBuy">Supprimer mon compte</button><br/>
                {this.renderRedirect()}
                <button style={{backgroundColor: "#FF0000"}} class="btnBuy" onClick={this.setRedirect}>Déconnexion</button>
            </div>
        );
    }
}

export default Parametres;