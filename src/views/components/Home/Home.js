import React from "react";
import { Route, Link } from 'react-router-dom'
import "../../pages/Game/Game.scss";

function Home() {

  return (
    <div className="Home">  
        <div class="sousMenu">
            <div class="tab">
                <Link to="/game/home/" class="buttonMenu sousButton">Ordinateur</Link>
                <Link to="/game/home/virus" class="buttonMenu sousButton">Virus</Link> <br />
            </div>
        </div>
    </div>

  );
}

export default Home;
