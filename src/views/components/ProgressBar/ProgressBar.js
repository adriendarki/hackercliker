import React, { Component } from "react";
import "./ProgressBar.scss";

const Filler = (props) =>{
    return <div className={`filler ${props.className}`} style={{width: `${props.taille}%` }}></div>
}

class ProgressBar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="progress-bar">
                <Filler className = {this.props.classe} taille={parseInt(this.props.hpRestant / this.props.hpTotal * 100, 10)}/>
            </div>
        );
    }
}

export default ProgressBar;