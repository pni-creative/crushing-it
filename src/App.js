import React from 'react';
import Winner from './Winner';
import Inputs from './Inputs';
import Buttons from './Buttons';
import './App.scss';
var db = require("./database.js");



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nominees: [],
      winner: "",
      timesOfNomination: [],
    }
  }
  
  handleAdd() {
    var inputField = document.getElementById("add");
    var multipleField = document.getElementById("plus");

    const nominee = inputField.value;
    const multiplier = multipleField.value;

    if (nominee === "test") {
      var testNames = 
        [
          {name: "amir", votes: 4},
          {name: "david", votes: 2},
          {name: "gabe", votes: 2},
          {name: "mayna", votes: 2},
          {name: "vince", votes: 2},
          {name: "carlos", votes: 1},
          {name: "francesca", votes: 2},
          {name: "jinn", votes: 1},
          {name: "kevin", votes: 1},
          {name: "connie", votes: 1},
          {name: "will", votes: 2},
        ]

      for (var i = 0; i < testNames.length; i++) {
        for (var j = 0; j < testNames[i].votes; j++) {
          this.state.nominees.push(testNames[i].name);
          this.setState({nominees: this.state.nominees});
        }
        this.handleNominees(testNames[i].name, testNames[i].votes);
      } 
    } else if (multiplier.trim() !== "" && nominee.trim() !== "") {

      for(var i = 0; i < multiplier; i++) {

        this.state.nominees.push(nominee);
        this.setState({nominees: this.state.nominees});
      }

      this.handleNominees(nominee, multiplier);

    } else if (nominee.trim() !== "") {

      this.state.nominees.push(nominee);
      this.setState({nominees: this.state.nominees});
      this.handleNominees(nominee, multiplier);

    }

    inputField.value = "";
    multipleField.value = "";
  }

  handleNominees(nominee, multiplier) {
    const n = nominee;
    let m = "";
    if(multiplier !== "") {
      m = parseInt(multiplier);
    } else {
      m = 1;
    }

    if(this.state.timesOfNomination.length === 0 ){
      this.state.timesOfNomination.push({name: n, times: m});
      this.setState({timesOfNomination: this.state.timesOfNomination});
    } else {
      for (let [ i, v] of this.state.timesOfNomination.entries()) {
        if(v.name === n) {
          return this.setState(prevState => {
            const current = {...prevState.timesOfNomination};
            current[i].times = v.times + m;
          });
        }
      }
      this.state.timesOfNomination.push({name: n, times: m});
      return this.setState({timesOfNomination: this.state.timesOfNomination});
    }
  }
  
  handleOnKeyPress (e) {
    if(e.charCode == '13') {
        this.handleAdd();
       }
  }
  
  handleWinner() {

    
    var inputField = document.getElementById("add");
    inputField.value = "";

    const nominees = this.state.nominees;
    
    var nomLength = nominees.length;
    var timeMultiplier = 1;
    
    while(nomLength > 1) {
 
      setTimeout(() => {
        this.removeNom(Math.floor(Math.random()*(this.state.nominees.length)))
      }, 500*timeMultiplier);
      
      timeMultiplier++;
      nomLength--;

      if (nomLength === 1) {
        
        setTimeout(() => {
          
          const winner =  this.state.nominees[0];
          this.setState({winner: winner});
          this.setState({nominees: []});
          this.setState({timesOfNomination: []});

          db.add(nominees, winner);
        
      }, 500*timeMultiplier);
    }
  }
 }
  
  startAgain() {
    this.setState({winner: ""});
    this.setState({nominees: []});
    this.setState({timesOfNomination: []});
  }
  
  removeNom(index) {
  var noms = [...this.state.nominees]; 
  let indexName = noms[index];

  if (index !== -1) {
    noms.splice(index, 1);
    this.setState({nominees: noms});
  }

  //remove from timesOfNomination
  for (let [ i, v] of this.state.timesOfNomination.entries()) {
    if(v.name === indexName) {
      if(v.times === 1) {
        return this.setState({timesOfNomination: this.state.timesOfNomination.filter(i => i.name !== indexName)});
      } else {
        return this.setState(prevState => {
          const current = {...prevState.timesOfNomination};
          current[i].times = v.times -1;
        });
      }
    }
  }
  
}



  
  render () {
    var show = this.state.winner === "" ? "hide" : "show winner-container";
    var hideButton = this.state.winner === "" ? "show" : "hide";
    var hideInput = this.state.winner === "" ? "show" : "hide";
    var hideStartButton = this.state.winner === "" ? "hide" : "show";
    
    const nominees = this.state.timesOfNomination.map((value, i) => {
      const name = value.name;
      let times = "";
      let liStyle = "";

      times = value.times;
      
      if(times > 1) {
        liStyle = {
          fontSize: 25 + 3 * times + 'px',
        };
      } else {
        liStyle = {
          fontSize: '25px',
        };
      }

      return (<li key={i} style={liStyle} className="animated fadeInUp" onClick={() => this.removeNom(i)} > {name} <span>{times}</span></li>)
    })
    
    return (
      <div className="container">
        <div className="forms">
          <h1>PNI Creative <br/> Crushing it! Award</h1>
          <div>
            <Inputs 
              hideInput={hideInput}
              onKeyPress={this.handleOnKeyPress.bind(this)}/>
            <Buttons 
              hideButton={hideButton}
              hideStartButton={hideStartButton}
              handleWinner={this.handleWinner.bind(this)}
              startAgain={this.startAgain.bind(this)}/>
          </div>
        </div>
        <div className="content">
          <ul>
            {nominees}
          </ul>
          <Winner winner={this.state.winner} hide={show} />
        </div>
       
      </div>
    )
  }
}

export default App;
