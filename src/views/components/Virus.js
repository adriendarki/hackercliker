import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import "./Ordinateur/Ordinateur.scss";
import { httpGetRequest } from './fetch.js'
import { convertion } from '../components/convert.js'

var scientificToDecimal = require("scientific-to-decimal")


class Virus extends Component {

  constructor(props){
    super(props)
		this.state = {
			user_modules_quant: [],
		}
  }

  

	componentDidMount() {
		const url = `game/home/${ this.props.id }`
		httpGetRequest(url)
			.then((res) => {
				this.setState ({
					user_modules_quant : res.userModulesQuantity.virus,
				})
      })
      
  }

  buy = (m) => {
    if(this.props.onBuy(m)) console.log(`component ${m.name} buyed`);
  }
  
  render(){


    const modulesVirus = this.state.user_modules_quant.map((m) => (
			<tr key={m.id}> 
				<td> {m.name} </td> 
				<td> {convertion(scientificToDecimal(m.infection_per_sec))} i/s </td> 
				<td> {convertion(scientificToDecimal(m.quantity))}</td>
				<td> {convertion(scientificToDecimal(Math.round(m.price = m.base_cost * Math.pow(1.2, m.quantity, 10))))} $</td>
				<td><button onClick={() => this.buy(m)} class="btnBuy"> Achat </button></td>
			</tr>
    ))
    
    return (

        <div className="Home">  
          <div class="sousMenu">
              <div class="tab">
                  <Link to="/game/home/" class="buttonMenu sousButton">Ordinateur</Link>
                  <Link to="/game/home/virus" class="buttonMenu sousButton">Virus</Link> <br />
              </div>
          </div>

          <h3>Virus</h3>
          <div class="table-wrapper">
            <table>
              <div class="fixed_header">
                <tbody>
                  <tr>
                    <td>Module</td>
                    <td>Efficacité</td>
                    <td>Niveau</td>
                    <td>Coût</td>
                    <td></td>
                  </tr>

                  { modulesVirus }

                </tbody>
              </div>
            </table>
          </div>
        </div>
        
    );
  }
}

export default Virus;
