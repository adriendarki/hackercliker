import React, { Component } from "react";
import { httpGetRequest } from './fetch.js'
import { convertion } from '../components/convert.js'

var scientificToDecimal = require("scientific-to-decimal")

class Modules extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			modules_pc: [],
			modules_virus: [],
		}
	}

	componentDidMount() {
		this.getResearchables();
	}

	buy = (m) => {
		this.props.onBuy(m).then(() => {
			console.log("dededededede")
			if(m.categorie === 0){
				this.setState({
					modules_pc: this.state.modules_pc.filter((item) => item.id !== m.id)
				}, () => {this.getResearchables();})
			}else{
				this.setState({
					modules_virus: this.state.modules_virus.filter((item) => item.id !== m.id)
				}, () => {this.getResearchables();})
			}
		});
	}

	getResearchables(){
		const url = `game/home/${ this.props.id }`;
		httpGetRequest(url)
			.then((res) => {
				this.setState ({
					modules_pc : res.modulesPc,
					modules_virus : res.modulesVirus,
				})
			});
	}

	render(){

		const tablePC = this.state.modules_pc.map((m, index) => (
			<tr key={index}> 
				<td> {m.name} </td> 
				<td> {convertion(scientificToDecimal(m.infection_per_sec))} i/s </td> 
				<td> {convertion(scientificToDecimal(m.dollar_per_sec))} $/s</td>
				<td> {convertion(scientificToDecimal(m.research_cost))} $</td>
				<td><button onClick={() => this.buy(m)} class="btnBuy"> Achat </button></td>
			</tr>
		))

		const tableVirus = this.state.modules_virus.map((m, index) => (
			<tr key={index}> 
				<td> {m.name} </td> 
				<td> {convertion(scientificToDecimal(m.infection_per_sec))} i/s </td> 
				<td> {convertion(scientificToDecimal(m.dollar_per_sec))} $/s</td>
				<td> {convertion(scientificToDecimal(m.research_cost))} $</td>
				<td><button onClick={() => this.buy(m)} class="btnBuy"> Achat </button></td>
			</tr>
		))

		return(
			<div className="Home">
				<h3>Modules</h3>
				<div class="table-wrapper"> 
					<table>
						<div class="fixed_header">
							<tbody>
								<td colSpan="5">Ordinateur</td>

								<tr>
									<td>Module</td>
									<td>Efficacité (Infectés)</td>
									<td>Efficacité (Argent)</td>
									<td>Coût</td>
									<td></td>
								</tr>

								{tablePC}

								<td colSpan="5">Virus</td>

								<tr>
									<td>Module</td>
									<td>Efficacité (Infectés)</td>
									<td>Efficacité (Argent)</td>
									<td>Coût</td>
									<td></td>
								</tr>

								{tableVirus}

							</tbody>
						</div>
					</table>
				</div>
			</div>
		);
	}
}

export default Modules;