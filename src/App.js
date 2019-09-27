import React from 'react';
import Nominee from './Nominee';
import Winner from './Winner';
import Inputs from './Inputs';
import Buttons from './Buttons';
import './App.scss';
var db = require("./database.js");


const initialState = {
  nominees: [],
      winner: "",
      timesOfNomination: [],
      input: "",
      quantityField: "1",
      labelButton: "CRUSHING IT!!"
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  onInputChange(e) { this.setState({input: e.target.value}); }
  onMultipleInputChange(e) { this.setState({quantityField: e.target.value}); }
  
  handleAdd() {
    let multiplier = this.state.quantityField;
    const nominee = this.state.input;


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

    this.setState({input : ''});
    this.setState({quantityField: ''})
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
    this.setState({input: ''});
    this.setState({labelButton: "Start Again"})

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
       this.setState(initialState);
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
    let show = this.state.winner === "" ? "hide" : "show winner-container";
    let formInputs;
    let formButtons;

    if(!this.state.winner) {
      formInputs = <Inputs
                      input={this.state.input}
                      onKeyPress={this.handleOnKeyPress.bind(this)}
                      onChange={this.onInputChange.bind(this)}
                      quantityChange={this.onMultipleInputChange.bind(this)} />

      formButtons = <Buttons
                      label = {this.state.labelButton}
                      onClick={this.handleWinner.bind(this)}/>
    } else {
      formButtons = <Buttons
                      label = {this.state.labelButton}
                      onClick={this.startAgain.bind(this)}/>
    }

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
      return (<Nominee name={name} times={times} key={i} style={liStyle} clickFn={() => this.removeNom(i)} />)
    })
    
    return (
      <div className="container">
        <div className="forms">
          <h1>PNI Creative <br/> Crushing it! Award</h1>
          <div>
            {formInputs}
            {formButtons}
          </div>
        </div>
        <div className="content">
          <ul>
            {nominees}
            <Nominee />
          </ul>
          <Winner 
            winner={this.state.winner} 
            hide={show} />
        </div>
       
      </div>
    )
  }
}

export default App;
