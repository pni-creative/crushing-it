import React from 'react';
import db from './database';
import fbRef from './databaseRT';
import cinematic from './audio/no-time-for-caution.m4a';

class Race extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        leaderboard: [],
        allNames: []
    };
  }
  
  async componentDidMount() {
    document.body.classList.add("race");
    const leaderboard = await db.getLeaderBoard();
    this.setState({leaderboard: leaderboard})
    let allNames = await db.getAllNames();

    //shuffle allNames array. Fisher–Yates shuffle algorithm:
    for (let i = allNames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allNames[i], allNames[j]] = [allNames[j], allNames[i]];
    }

    console.log("allnames: ", allNames )
    this.setState({allNames: allNames});
    
    const refObj =  fbRef.database().ref('_race/');
    
    refObj.on('value', snapshot => {

      snapshot.forEach((child) => { 

        const avatarId = "racer__avatar--" + child.key;
        const avatar = child.val().avatar;
        const avatarEl = document.getElementById(avatarId);
        avatarEl.insertAdjacentHTML("afterbegin", avatar);
      });
      
    });
    
    

  }
  
  startRace() {
    let audio = new Audio(cinematic);
    audio.play();
    var racers = document.getElementsByClassName("racer__rocket");
    for(var i = 0; i < racers.length; i++) {
      racers[i].className += " go";
    }
    var raceWrapper = document.getElementsByClassName("race-wrapper");
    //raceWrapper[0].className += " zoom";
    
    this.gogogo();
  }
  
  
  
  gogogo() {
    var speed = 40;
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
        
        //let index = Math.floor(Math.random() *  namesLength);
        //var drawnName = namesArrayCopy[index];
        
        var drawnName = namesArrayCopy.pop();
        //namesArrayCopy.splice(index, 1);
        
        var zapPlayer = document.getElementById("racer__score--" + drawnName);
        //zapPlayer.classList.add("flash", "animated");

        
        /*var classname = document.getElementsByClassName("zap");
        for (var i = 0; i < classname.length; i++) {
          classname[i].innerHTML = ""
        }*/
        zapPlayer.innerHTML -= 1;
        if (zapPlayer.innerHTML == 0) {
          zapPlayer.innerHTML = "";
        }
        
        
        if (!namesArrayCopy.includes(drawnName)) {
          var eliminateId = document.getElementById("racer__avatar--" + drawnName);
          
          document.getElementById(drawnName).classList.add("out");
          document.getElementById("racer__rocket--" + drawnName).style.animationPlayState = "paused";
          eliminateId.innerHTML = "💥";
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
              <div key={i} className="racer" id={leaderboard.user}>
                <span className="racer__rocket" id={"racer__rocket--" + leaderboard.user}>
                  <span className="racer__avatar" id={"racer__avatar--" + leaderboard.user}></span>
                  <span className="racer__score" id={"racer__score--" + leaderboard.user} >{leaderboard.total}</span>
                </span>
                <span className="racer__name">{leaderboard.user}</span>
              </div>
            )}
          </div>
          <ul class="stars">
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
  <li> </li>
</ul>
        </div>
    )
  }
}

export default Race;
