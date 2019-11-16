import React, { Component } from "react";
import "./Home/Home.scss";
import { httpGetRequest } from './fetch.js'
import { convertion } from '../components/convert.js'

var scientificToDecimal = require("scientific-to-decimal")

class Stats extends Component{
	
	constructor(props){
        super(props)
        this.state = {
            user_stats: [],
        }
    }

    
    
    componentDidMount() {
		const url = `game/home/${ this.props.id }`
		httpGetRequest(url)
			.then((res) => {
				this.setState ({
					user_stats : res.userStats,
				})
			})
    }

    // merci Google (fleme de le faire a la main xD)
    timeConverter(UNIX_timestamp){
        const a = new Date(UNIX_timestamp);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
    

    render(){
        console.log(this.state.user_stats);
        const userStats = (
            <div id="Stats">
                <h3>Stats</h3>
                <div className="left">
                    <h4> Premier lancement du jeu: {this.timeConverter(this.state.user_stats.register_date)} </h4> <br />
                    <h4> Argent gagné (clic): {convertion(scientificToDecimal(this.state.user_stats.clickedDollars))} </h4> <br />
                    <h4> Infections totales: {convertion(scientificToDecimal(this.state.user_stats.infectTot))} </h4> <br />
                    <h4> Argent gagné depuis le début: {convertion(scientificToDecimal(this.state.user_stats.moneyWin))} </h4> <br />
                    <h4> Argent dépensé: {convertion(scientificToDecimal(this.state.user_stats.moneySpent))} </h4> <br />
                </div>
            </div>
        )


        return( 
            <div id="Stats" class="tabcontent">
                { userStats }
            </div>
        );
    }
}

export default Stats;