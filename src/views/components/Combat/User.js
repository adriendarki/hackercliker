import React, { Component } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./User.scss";


class User extends Component {
    constructor(props){
        super(props);
    }

    click = (e) => {
        this.props.click(e);
    }


    render(){
        return(
            <div className = "userContainer">
                <div className = "progressBarContainer">
                    <ProgressBar classe = {this.props.classe} hpRestant = {this.props.hpRestant} hpTotal = {this.props.hpTotal} />
                </div>
                <div className = "userInfoContainer">
                    <p>{`Attaque : ${this.props.attaque}`}</p>
                    <p>{`Defense : ${this.props.defense}`}</p>
                </div>
                <div className="userImgContainer">
                    <img src={this.props.img} className="pc" alt="pc" onClick={this.click} />
                </div>
                <div className="userPseudoContainer">
                    <p className="Combat-p">{this.props.pseudo}</p>
                </div>
            </div>
        )
    }


}


export default User;