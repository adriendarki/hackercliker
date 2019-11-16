import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import epe from "../../../assets/images/epe.jpg" ;import './Resultat.scss';
//import pc from "../../../assets/images/pc.png" ;
import hacker from "../../../assets/images/hacker.png" ;
import{  } from "../../components";
import { Button } from 'antd/lib/radio';


//pt vie restant du joueur
        const ProgressBar = (props) => {
            return (
                <div className="progress-bar_resultat">
                    <Filler taille={props.taille}/>
                </div>
            );
        }

        const Filler = (props) =>{
            return <div className="filler_resultat" style={{width: `${props.taille < 1 ? 0 : props.taille}%` }}></div>
        }



class Resultat  extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.winner = this.props.location.state.winner;
        this.looser = this.props.location.state.looser;
    }


    render() { 
        return (

        <div>
            <div id = "block">
            <h1 id="resultat">Resultat</h1>

                

                <div id = "winner">
                    <h3>{this.winner.pseudo}</h3>
                    <img src={hacker} className="hacker" alt="hacker"  />
                    <div id="left-result">
                        {/* <p>Nb clic</p> */}
                        {/* <p>durée du hack/timer</p> */}

                        <ProgressBar taille={this.winner.prct}/>
                        <p>Gain de 10% des infectés adverses</p>
                    </div>
                    <div id ="winloose">
                        <h1>Winner</h1>
                    </div>
                </div>

                <div id = "looser">
                <h3>{this.looser.pseudo}</h3>
                    <img src={hacker} className="hacker" alt="hacker"  />
                    <div id="left-result">
                        {/* <p>Nb clic</p> */}
                        {/* <p>durée du hack/timer</p> */}
                        <div id ="joueur_2">
                        <ProgressBar taille={this.looser.prct}/>
                        </div>
                        <p>Perte de 10% des infectés</p>
                    </div>
                    <div id ="winloose">
                        <h1 >Looser</h1>
                    </div>
                    
                
                </div>
                <div id="Vs">
                <h1><img src={epe} className="epe" alt="epe"  /></h1>

                <div id = "Return">
                {/* <button onClick>Retour</button> */}
                <Link to={{
                    pathname: "/game/home/",
                    state: {id: this.props.location.state.myId}
                }}>Retour</Link>
                </div>
                </div>
                
                
            </div>
    
        </div>
        );

    }
}
 
export default Resultat ;