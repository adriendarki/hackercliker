import React, {Component} from 'react';
import './Combat.scss';
import pc from "../../../assets/images/pc.png" ;
import hacker from "../../../assets/images/hacker.png" ;
// import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { httpGetRequest, httpPostRequest } from '../../components/fetch.js';


import{ User } from "../../components";


class Combat extends Component{
	// pour passer des props à un component, check la page Game
	/* attendu dans les props :
		isAttacker -> Boolean
		attackerId -> Integer
		defenderId -> Integer
	*/
	
	//TODO remettre les props normales
	constructor(props){
		super(props);
		this.state = {
			timer: 30,
			myHpTotal: 100,
			myHpRestant: 10,
			hisHpTotal: 100,
			hisHpRestant: 10,
			redirectToResult: false,
		}
		this.myAttaque = 12;
		this.myDefense = 5;
		this.myPseudo = "Staline";
		this.hisAttaque = 25;
		this.hisDefense = 13;
		this.hisPseudo = "Hitler";
		
		this.baseHp = 250;
		this.bonusHp = 10;
	}


	componentDidMount(){
		httpGetRequest(`game/combat/start?attacker=${this.props.location.state.attackerId}&defender=${this.props.location.state.defenderId}`)
		.then((datas) => {
			const isAttacker = this.props.location.state.isAttacker;
			this.setState(() => {
				this.myAttaque = isAttacker ? datas.attacker.attaque : datas.defender.attaque;
				this.myDefense = isAttacker ? datas.attacker.defense : datas.defender.defense;
				this.myPseudo = isAttacker ? datas.attacker.pseudo : datas.defender.pseudo;
				
				this.hisAttaque = !isAttacker ? datas.attacker.attaque : datas.defender.attaque;
				this.hisDefense = !isAttacker ? datas.attacker.defense : datas.defender.defense;
				this.hisPseudo = !isAttacker ? datas.attacker.pseudo : datas.defender.pseudo;

				return{
					myHpTotal: isAttacker ? this.baseHp + datas.attacker.defense * this.bonusHp : this.baseHp + datas.defender.defense * this.bonusHp,
					myHpRestant: isAttacker ? this.baseHp + datas.attacker.defense * this.bonusHp : this.baseHp + datas.defender.defense * this.bonusHp,

					hisHpTotal: !isAttacker ? this.baseHp + datas.attacker.defense * this.bonusHp : this.baseHp + datas.defender.defense * this.bonusHp,
					hisHpRestant: !isAttacker ? this.baseHp + datas.attacker.defense * this.bonusHp : this.baseHp + datas.defender.defense * this.bonusHp,
				}
			})
			this.myInterval=setInterval(()=>{
				const a = this.state.timer === 0, b = this.state.myHpRestant <= 0, c = this.state.hisHpRestant <= 0;
				if(a || b || c){
					//seul l'attacker envoie le resultat la l'api
					if(this.props.location.state.isAttacker){
						let winner, looser;
						if(a || b){
							looser = this.props.location.state.attackerId;
							winner = this.props.location.state.defenderId;
						}
						if(c){
							looser = this.props.location.state.defenderId;
							winner = this.props.location.state.attackerId;
						}
						httpPostRequest(`game/combat/result?winner=${winner}&looser=${looser}`);
					}
					this.setState(() => {return{redirectToResult: true}})

				}
				this.setState(prevState => {
					return{
						timer: prevState.timer -1,
						hisHpRestant: prevState.hisHpRestant - this.myAttaque,
						myHpRestant: prevState.myHpRestant - this.hisAttaque *2,
					}
				})
			},1000)
		})
		.catch((err) => {console.log("something went wrong :(")});
	}
	
	componentWillUnmount(){
		clearInterval(this.myInterval);
	}

	onClickEnnemy(e){
		this.setState((prevState) => {
			return {hisHpRestant: prevState.hisHpRestant - this.myAttaque}
	 })}


	render () {
		
		if(this.state.redirectToResult){
			const a = this.state.timer === 0, b = this.state.myHpRestant <= 0, c = this.state.hisHpRestant <= 0;
			let winnerObj, looserObj = {pseudo: "", prct: 0};
			const myPrct = parseInt(this.state.myHpRestant / this.state.myHpTotal * 100, 10);
			const hisPrct = parseInt(this.state.hisHpRestant / this.state.hisHpTotal * 100, 10);

			if(a || b){
				winnerObj = this.props.location.state.isAttacker ? {pseudo: this.hisPseudo, prct: hisPrct} : {pseudo: this.myPseudo, prct: myPrct};
				looserObj = !this.props.location.state.isAttacker ? {pseudo: this.hisPseudo, prct: hisPrct} : {pseudo: this.myPseudo, prct: myPrct};
			} else if(c){
				winnerObj = !this.props.location.state.isAttacker ? {pseudo: this.hisPseudo, prct: hisPrct} : {pseudo: this.myPseudo, prct: myPrct};
				looserObj = this.props.location.state.isAttacker ? {pseudo: this.hisPseudo, prct: hisPrct} : {pseudo: this.myPseudo, prct: myPrct};
			}
			
			return (<Redirect to={{
				pathname: '/game/combat/resultat',
				state:{
					myId: this.props.location.state.isAttacker ? this.props.location.state.attackerId : this.props.location.state.defenderId,
					winner: winnerObj,
					looser: looserObj,
					timer: this.state.timer,
				}
			}}/>);
		}


		return (
			<div className = "mainCombatContainer">	
				<div>
					<User 
						hpRestant={this.state.myHpRestant}
						hpTotal = {this.state.myHpTotal}
						attaque = {this.myAttaque}
						defense = {this.myDefense}
						pseudo = {this.myPseudo}
						click = {() => {this.onClickEnnemy()}}
						img = {pc}
						classe = ""
					/>
				</div>

				<div className="timer">
					<p className="timer_p"> Temps restant : {this.state.timer}</p>
				</div>

				<div>
					<User 
						hpRestant={this.state.hisHpRestant}
						hpTotal = {this.state.hisHpTotal}
						attaque = {this.hisAttaque}
						defense = {this.hisDefense}
						pseudo = {this.hisPseudo}
						click = {() => {this.onClickEnnemy()}}
						img = {pc}
						classe = "ennemiHpBar"
					/>
				</div>

			</div>
			
		);
	}
	
}


export default Combat;
