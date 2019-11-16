import React, { Component } from "react";
import { httpGetRequest } from './fetch.js'
import { Socket } from "dgram";
import { EventEmitter } from "events";
import { Redirect } from "react-router";

class Raid extends Component{

	constructor(props){
		super(props)
		this.state = {
			raidUser: -1,
			redirectToCombat: false,
		}
	}


	startRaid = () => {
		console.log("Searching for ennemies");
		// socket.join('room 237', () => {
		// 	let rooms = Object.keys(socket.rooms);
		// 	console.log(rooms); // [ <socket.id>, 'room 237' ]
		// 	io.to('room 237').emit('a new user has joined the room'); // broadcast to everyone in the room
		//   });
		//socket.to('room 237').emit('socket.id')
		// TODO un trucmagique avec les sockets
		// redirection combat
		this.setState(() => {return {redirectToCombat: true};});
	}

	
    componentDidMount() {
		//TODO doit fetch sur combat...
		const url = `game/combat/enemy/${this.props.id}`;
		httpGetRequest(url)
			.then((res) => {
				this.setState(() => {
					return {raidUser : res,}
				})
			})
    }

    render(){
		if(this.state.redirectToCombat){
			return (<Redirect to={{
				pathname: '/game/combat/',
				state:{
					isAttacker: true,
					attackerId: this.props.id,
					defenderId: this.state.raidUser,
				}
			}}/>);
		}

	
		return(
			<div id="Raid" class="tabcontent">
				<h3>RAID</h3>
				<div class="table_wrapper">
					<table>
						<div class="fixed_header">
							<button onClick = {() => this.startRaid()} className="btnBuy">Trouver un adversaire</button><br></br>
							{/* <button onClick={this.props.history.push('./combat')} className="btnBuy">Hacker une banque</button> */}
							
							
						</div>
					</table>
				</div>

			</div>
		);
	}
}

export default Raid;