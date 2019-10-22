import React from 'react';
import Nominee from './Nominee';
import Winner from './Winner';
import Inputs from './Inputs';
import Buttons from './Buttons';
import db from './database';
import fbRef from './databaseRT';
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nominees: [],
      winner: "",
      timesOfNomination: [],
      input: "",
      quantityField: "1",
      labelButton: "CRUSHING IT!!",
      winnerWins: "",
      winnerNominations: ""
    }
  }

  componentDidMount() {
    const refObj =  fbRef.ref();
    var arr = [];
    refObj.on('value', snapshot => {

      var arrN = [];

      snapshot.forEach((child) => {   
        if ( child.val().votes ) {
          console.log('v:', child.val().name);
          console.log('len2:', Object.keys(child.val().votes).length);
          var len2 =  Object.keys(child.val().votes).length;
          var v = child.val().name;
          let nn = true;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === v) {
              nn = false;
              arr[i].times = len2;
            }
          }
          if (nn) {  arr.push({name: v, times: len2}); } 
        
    
        for (var i = 0; i < len2; i++) {
          arrN.push(v);
        }
        }
        
        

      });
      this.setState({timesOfNomination: arr});
      this.setState({nominees: arrN});
    });
  }

  onInputChange(e) { 
		let value = e.target.value.toLowerCase();
		this.setState({input: value}); 
  }

  onMultipleInputChange(e) { this.setState({quantityField: e.target.value}); }
  
  handleAdd() {
    let multiplier = this.state.quantityField;
    let nominee = this.state.input;
    nominee = nominee.charAt(0).toUpperCase() + nominee.slice(1);

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
    if(e.charCode === 13) {
        this.handleAdd();
    }
  }
  
  handleWinner (e) {
	  e.target.blur();
    this.setState({
      input: '',
      labelButton: "Start Again"
    });

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

            db.addNomineesToDb(nominees, winner).then((data) => {
              this.setState({
                winner: winner,
                nominees: [],
                timesOfNomination: [],
                winnerWins: data.wins,
                winnerNominations: data.nominations
              });
const refObj = fbRef.ref('votes')
refObj.once('value', (snapshot) => {
     snapshot.ref.remove();

});
            });
          
        }, 500*timeMultiplier);
      }
    }
  }
  
  startAgain(e) {
   e.target.blur();
    
    
    this.setState({
      winner: "",
      nominees: [],
      timesOfNomination: [],
      labelButton: "CRUSHING IT!",
      winnerWins: "",
      winnerNominations: ""
    })
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
    let formInputs;
    let formButtons;
    let nomineeList;
    let winnerContent;

    if(!this.state.winner) {
		formInputs = <Inputs
						input={this.state.input}
						onKeyPress={this.handleOnKeyPress.bind(this)}
						onChange={this.onInputChange.bind(this)}
						quantityChange={this.onMultipleInputChange.bind(this)} />

		formButtons = <Buttons
						label = {this.state.labelButton}
						onClick={this.handleWinner.bind(this)}/>
		nomineeList = <Nominee
						timesOfNomination={this.state.timesOfNomination} 
						clickFn={(i) => this.removeNom(i)} />
    } else {
		formButtons = <Buttons
						label = {this.state.labelButton}
						onClick={this.startAgain.bind(this)}/>
		winnerContent = <Winner 
            winner={this.state.winner}
            wins={this.state.winnerWins}
            nominations={this.state.winnerNominations} />
	}

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
            {nomineeList}
            {winnerContent}
        </div>
       
      </div>
    )
  }
}

export default App;
