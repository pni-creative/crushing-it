import React from 'react';
import db from './database';

class Race extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        leaderboard: [],
        allNames: []
    };
  }
  
  async componentDidMount() {
      const leaderboard = await db.getLeaderBoard();
      this.setState({leaderboard: leaderboard})
      const allNames = await db.getAllNames();
      this.setState({allNames: allNames})
  }
  
  startRace() {
    var racers = document.getElementsByClassName("racer");
    for(var i = 0; i < racers.length; i++) {
      racers[i].className += " go";
    }
    var raceWrapper = document.getElementsByClassName("race-wrapper");
    //raceWrapper[0].className += " zoom";
    
    this.gogogo();
  }
  
  gogogo() {
    var speed = 50;
    var namesArrayCopy =  [...this.state.allNames];
    var namesLength = namesArrayCopy.length;
    if (namesArrayCopy.length <= 3) {
      speed = 4800;
    } else if (namesArrayCopy.length <= 5) {
      speed = 2000;
    } else if (namesArrayCopy.length <= 10) {
      speed = 1250;
    } else if (namesArrayCopy.length <= 20) {
      speed = 500;
    } 

    if (namesLength > 1) {
      setTimeout((speed) => {
        
        let index = Math.floor(Math.random() *  namesLength);
        var drawnName = namesArrayCopy[index]
        
        namesArrayCopy.splice(index, 1);
        if (!namesArrayCopy.includes(drawnName)) {
          var eliminateId = document.getElementById(drawnName);
          eliminateId.classList.remove("go");
          //eliminateId.style.animationPlayState = "paused";
        }
        
        if (namesLength > 1) {
          this.setState({allNames: namesArrayCopy});
          
          this.gogogo();
        }
      }, speed);
    }
  }

  render () {
    return (
        <div>
          <button onClick={this.startRace.bind(this)} className="start-button">Start</button>
          <div className="race-wrapper">

            {this.state.leaderboard.map((leaderboard, i) => 
              <div key={i} className="racer" id={leaderboard.user}>{i}</div>
            )}
          </div>
        </div>
    )
  }
}

export default Race;
