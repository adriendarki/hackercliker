import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Content.scss";


import { LogPage, Game, Combat, ErrorPage, Cgu, Cgv, Resultat } from "../pages";
import { Header, Footer } from "../layouts";

function Content() {
  return (
    <div className="contentPage">
      {/* A savoir, on utilise 3 switch pour choisir si on met un header ou un footer (et quel content) pour chaques pages
      De plus, toutes les routes sont repertoriés ici afin que toutes les mauvaises menent à Error */}
      {/* header */}
      <Switch>
          <Route exact path="/" component={Header} />
          <Route exact path="/game/combat" component={Header} />
          <Route exact path="/cgv" component={Header} />
          <Route exact path="/cgu" component={Header} />
          
          <Route exact path="/game" component={Header} />
          <Route exact path="/game/home/" component = { Header } />
          <Route exact path="/game/home/virus" component = { Header } />
          <Route exact path="/game/modules" component = { Header } />
          <Route exact path="/game/raid" component = { Header } />
          <Route exact path="/game/stats" component = { Header } />
          <Route exact path="/game/parametres" component = { Header } />
      </Switch>
      {/* content */}
      <Switch>
          <Route exact path="/" component={LogPage} />
          <Route exact path="/game/combat" component={Combat} />
          <Route exact path="/game/combat/resultat" component={Resultat} />
          <Route exact path="/cgv" component={Cgv} />
          <Route exact path="/cgu" component={Cgu} />

          <Route exact path="/game" component={Game} />
          <Route exact path="/game/home/" component = { Game } />
          <Route exact path="/game/home/" component = { Game } />
          <Route exact path="/game/home/virus" component = { Game } />
          <Route exact path="/game/modules" component = { Game } />
          <Route exact path="/game/raid" component = { Game } />
          <Route exact path="/game/stats" component = { Game } />
          <Route exact path="/game/parametres" component = { Game } />
          <Route component={ErrorPage}/>
      </Switch>
      {/* footer */}
      <Switch>
          <Route exact path="/" component={Footer} />
          <Route exact path="/cgv" component={Footer} />
          <Route exact path="/cgu" component={Footer} />
          
          <Route exact path="/game" component={Footer} />
          <Route exact path="/game/home/" component = { Footer } />
          <Route exact path="/game/home/virus" component = { Footer } />
          <Route exact path="/game/modules" component = { Footer } />
          <Route exact path="/game/raid" component = { Footer } />
          <Route exact path="/game/stats" component = { Footer } />
          <Route exact path="/game/parametres" component = { Footer } />
      </Switch>
    </div>
  );
}

export default Content;
