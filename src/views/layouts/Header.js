import React, { Component } from "react";
import "./Header.scss";
import soundfile from '../../assets/music/hacker-music.mp3'
import Sound from 'react-sound'

class Header extends Component {

  
  render(){
    return (
      <header>
          <link href="https://fonts.googleapis.com/css?family=Saira+Stencil+One&display=swap" rel="stylesheet"/> 
          <h1>HACKER-CLICKER</h1>
          <p>Bienvenue !</p>

          <Sound
            url={soundfile}
            playStatus={Sound.status.PLAYING}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />
      </header>
      
    );
  }
}

export default Header;
