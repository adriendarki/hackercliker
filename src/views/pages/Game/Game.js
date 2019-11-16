import React, {Component} from "react";
import { Route, Link, Redirect } from 'react-router-dom'
import "./Game.scss";
import { httpGetRequest, httpPostRequest, updateUserInfo } from '../../components/fetch.js'
import { convertion } from '../../components/convert.js'
import logo from "../../../assets/images/icone_clique.png";
import { Home, Modules, Raid, Stats, Parametres, Ordinateur, Virus } from '../../components';

var scientificToDecimal = require("scientific-to-decimal")

class Game extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    if(!this.props.location.state){
      this.state = {
        toLogin: true,
      }
      this.render();
    }else{
      this.state = {
        tauxRafraichissement: 10,
        id: this.props.location.state.id,
        infecte: 0,
        gain: 0,
        user_infos: [],
        users_stats: [],
        user_modules: {
          pc: [],
          virus: [],
        },
      }
    }
    this.gains = 0;
    this.infected = 0;
  }

  Clicker() {
    this.setState((prevState) => {
       return {gain: prevState.gain + this.getCoefficientClique()}
    });
  }

  getArgentIdle() {
    this.getCoefficientArgent();
    let date = Date.now();
    let tempsEcoule;
    tempsEcoule = ~~(date/1000) - ~~(this.state.last_connection/1000);

    this.setState (prevState => {
      return {
        gain: prevState.gain + tempsEcoule * this.gains,
        infecte: prevState.infecte + tempsEcoule * this.infected
      }
    })
     
  }

  componentDidMount(){
    const url = `game/home/${this.state.id}`
		httpGetRequest(url)
			.then((res) => {
				this.setState ({
          user_infos : res.userInfos,
          users_stats : res.userStats,
          user_modules : res.userModulesQuantity,
          gain: +res.userStats.moneyActual,
          last_connection: +res.userStats.last_connection,
        }, () => { this.getArgentIdle() })

        this.myInterval = setInterval(() => {
          this.getCoefficientArgent();
          this.setState(prevState => {
            return {
              infecte: prevState.infecte + this.infected / this.state.tauxRafraichissement,
              gain: prevState.gain + this.gains / this.state.tauxRafraichissement,
            }
          })
        },1000/this.state.tauxRafraichissement)  
      })
      
    document.title = "Hacker_Clicker"
  }

  getCoefficientArgent() {
    let coefficientArgent = this.getCoefficientInfecte() * this.state.infecte;
    this.state.user_modules.pc.map((m) => (
      coefficientArgent = coefficientArgent + m.dollar_per_sec * m.quantity
    ));
    this.gains = coefficientArgent;
    return (~~coefficientArgent > 1 && this.state.infecte > 0 ? coefficientArgent / this.state.tauxRafraichissement : 1 * this.state.infecte / this.state.tauxRafraichissement);;
  }

  getCoefficientClique() {
    const coefficientClique = (this.gains * 0.01);
    console.log(this.state.user_modules);
    return (~~coefficientClique > 1 ? ~~coefficientClique : 1);
  }

  getCoefficientInfecte() {
    let coefficient = 0;
    this.state.user_modules.virus.map((m) => (
      coefficient = coefficient + m.infection_per_sec * m.quantity
    ));
    this.infected = coefficient;
    return coefficient/this.state.tauxRafraichissement;
  }

  componentWillUnmount(){
    clearInterval(this.myInterval)
  }

  async onBuyModule(m) {
    m.quantity = 1;
    if(this.state.gain < m.research_cost) return false;

    // add le module dans le state pour les rendements/s
    if(m.categorie === 0){
      const pcs = [...this.state.user_modules.pc];
      pcs.push(m);
      const newModules = this.state.user_modules;
      newModules.pc = pcs;
      this.setState(() => {
        return {user_modules: newModules}
      });
    }else{
      const viruss = [...this.state.user_modules.virus];
      viruss.push(m);
      const newModules = this.state.user_modules;
      newModules.virus = viruss;
      this.setState(() => {
        return {user_modules: newModules}
      });
    }

    this.setState((prevState) => {
      return {
        gain: prevState.gain - m.research_cost,
      }
    });
    const url = `game/home/research?userId=${this.state.id}&moduleId=${m.id}`;
    return await Promise.all([
      httpPostRequest(url),
      updateUserInfo(this.state.id, this.state.gain, this.state.infecte),
    ])
    .then(() => {this.getCoefficientArgent(); return true;})
    .catch(() => {return false;});
  }

  onBuyPc = (m) => {
    if(this.state.gain < m.price) return false;
    m.quantity++;
    let id = -1;
    for(const modul of this.state.user_modules.pc){
      if(modul.id === m.id){
        id = this.state.user_modules.pc.indexOf(modul);
        break;
      }
    }
    this.setState((prevState) => {
      const prevModule = prevState.user_modules;
      prevModule.pc[id] = m;
      return {
        user_modules: prevModule,
        gain: prevState.gain - m.price,
      }
    }, () => {
      this.getCoefficientArgent();
    });
    const url = `game/home/buy?userId=${this.state.id}&moduleId=${m.id}&quantity=${m.quantity}`;
    updateUserInfo(this.state.id, this.state.gain, this.state.infecte);
    httpPostRequest(url);
    return true;
  }

  onBuyVirus = (m) => {
    if(this.state.gain < m.price) return false;
    m.quantity++;
    let id = -1;
    for(const modul of this.state.user_modules.virus){
      if(modul.id === m.id){
        id = this.state.user_modules.virus.indexOf(modul);
        break;
      }
    }
    this.setState((prevState) => {
      const prevModule = prevState.user_modules;
      prevModule.virus[id] = m;
      return {
        user_modules: prevModule,
        gain: prevState.gain - m.price,
      }
    }, () => {
      this.getCoefficientInfecte();
    });
    const url = `game/home/buy?userId=${this.state.id}&moduleId=${m.id}&quantity=${m.quantity}`;
		httpPostRequest(url);
    updateUserInfo(this.state.id, this.state.gain, this.state.infecte);
    return true;
    
  }  

  render() {

    if(this.state.toLogin) {
      return <Redirect to='/'/>;
    }

    const {infecte,gain} = this.state;
    const {infected,gains} = this;
    const userInfos = (
      <div className="userInfos">
				<h3>Pseudo: {this.state.user_infos.pseudo} </h3>
        <h3>Niveau: {this.state.user_infos.niveau} </h3> 
      </div>
    )

    const userStats = (
      <div className="Info">
				<p>Nombre d'infectés: {convertion(scientificToDecimal(infecte))}   {convertion(scientificToDecimal(this.infected))}/s</p>
        <p>Money: {convertion(scientificToDecimal(gain))}   {convertion(scientificToDecimal(this.gains))}/s</p> 
      </div>
    )
    
    return (
      <div className="Game">
        {userInfos}
        {userStats}

        <br/><br/><br/>
        <div className="zoneClc ripple" onClick={() => this.Clicker()}>
          <img src={logo} alt="icone de clique"/>    
        </div>  


        <div className="idle">
          <div className="tab">
            <Link to="/game/home/" className="buttonMenu">Accueil</Link>
            <Link to="/game/modules" className="buttonMenu">Modules</Link>
            <Link to="/game/raid" className="buttonMenu">RAID</Link>
            <Link to="/game/stats" className="buttonMenu">Stats</Link>
            <Link to="/game/parametres" className="buttonMenu">Paramètres</Link>
          </div>
  
          <Route exact path="/game/home/" component = {Home} />
          <Route
            exact path="/game/home/"
              render={() => <Ordinateur onBuy={(m) => this.onBuyPc(m)} 
              id = { this.state.id } />}
          />
          
          <Route
            exact path="/game/home/virus"
            render={() => <Virus onBuy={(m) => this.onBuyVirus(m)}
            id = { this.state.id } />}
          />
          <Route
            exact path="/game/modules"
            render={() => <Modules onBuy={(m) => this.onBuyModule(m)}
            id = { this.state.id } />}
          />
          <Route
            exact path="/game/raid"
            render={() => <Raid id = {this.state.id} />}
          />

          <Route
            exact path="/game/stats"
            render={() => <Stats id = {this.state.id} />}
          />

          <Route
            exact path="/game/parametres"
            render={() => <Parametres id = {this.state.id} />}
          />
        </div>

      </div>
    );
  }
}

export default Game;