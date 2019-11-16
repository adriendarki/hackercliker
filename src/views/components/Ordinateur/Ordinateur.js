import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import "./Ordinateur.scss";
import { httpGetRequest } from '../fetch.js';
import { convertion } from '../../components/convert.js'
import { Virus } from '..'

var scientificToDecimal = require("scientific-to-decimal")


class Ordinateur extends Component {

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
					user_modules_quant : res.userModulesQuantity.pc,
				})
			})
	}

	buy = (m) => {
		if(this.props.onBuy(m)) console.log(`component ${m.name} buyed`);
	}
	
  	render(){

		const modulesPC = this.state.user_modules_quant.map((m, index) => (
			<tr key={index}> 
				<td> {m.name} </td> 
				<td> {convertion(scientificToDecimal(m.dollar_per_sec))} $/s </td> 
				<td> {convertion(scientificToDecimal(m.quantity))}</td>
				<td> {convertion(scientificToDecimal(m.price = m.base_cost * Math.pow(1.2, m.quantity, 10)))} $</td>
				<td><button onClick={() => this.buy(m)} class="btnBuy"> Achat </button></td>
			</tr>
		))

	  return(
		<div className="Home"> 
			<h3>Ordinateur</h3>
			<div className="table-wrapper"> 
				<table>
					<div className="fixed_header">
						<tbody>
							<tr>
								<td>Pièce</td>
								<td>Efficacité</td>
								<td>Nombre</td>
								<td>Coût</td>
								<td></td>
							</tr>
							{ modulesPC }	
						</tbody>
					</div>
				</table>
			</div>

		<Route exact path="/game/home/virus" component = { Virus } />
		</div>
	  );
  	}
}

export default Ordinateur;