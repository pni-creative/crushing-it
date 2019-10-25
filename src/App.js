import React from 'react';
import Nominee from './Nominee';
import Winner from './Winner';
import Inputs from './Inputs';
import Buttons from './Buttons';
import db from './database';
import fbRef from './databaseRT';
import './App.scss';
import './themes/pages/leaderboard.scss';
import './themes/pages/profile.scss';

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

    var month = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
    document.body.classList.add(month);
    try {
      require(`./themes/${month}.scss`);
    }
    catch(err) {
      require('./themes/default.scss');
    }

    

    const refObj =  fbRef.ref();

    refObj.on('value', snapshot => {

      var nomineesCopy = [];

      var timesOfNominationCopy = this.state.timesOfNomination;

      for (var i = 0; i < timesOfNominationCopy.length; i++) {
       timesOfNominationCopy[i].times = 0;
      }

      snapshot.forEach((child) => {   
        if ( child.val().votes ) {
          console.log('v:', child.val().name);
          console.log('len2:', Object.keys(child.val().votes).length);
          var len2 =  Object.keys(child.val().votes).length;
          var v = child.val().name;
          let nn = true;
          
          for (var i = 0; i < timesOfNominationCopy.length; i++) {
            if (timesOfNominationCopy[i].name === v) {
              nn = false;
console.log('current', timesOfNominationCopy[i].times);
              timesOfNominationCopy[i].times += len2;
            }
          }
          if (nn) {  timesOfNominationCopy.push({name: v, times: len2}); } 
          

          for (var i = 0; i < len2; i++) {
            nomineesCopy.push(v);
          }
          
        }
        
      });
      this.setState({timesOfNomination: timesOfNominationCopy});
console.log(this.state.timesOfNomination);

      this.setState({
        nominees: nomineesCopy
      });
      console.log('nst: ', this.state.nominees);
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
    this.handleNominees(nominee, multiplier);
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

    var writeInNom = fbRef.ref().push();

    writeInNom.set({
      name: n
    });

    for (var i = 0; i < m; i++) {
      var newChildRef = fbRef.ref(writeInNom.key + '/votes/').push();
      newChildRef.set({
        plus_one: true
      });
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
            console.log(winner);

            db.addNomineesToDb(nominees, winner).then((data) => {
              this.setState({
                winner: winner,
                nominees: [],
                timesOfNomination: [],
                winnerWins: data.wins,
                winnerNominations: data.nominations
              });
              this.resetVotesFB();
            });
        }, 500*timeMultiplier);
      }
    }
  }
  
  startAgain(e) {
   e.target.blur();

   this.resetVotesFB();
        
    this.setState({
      winner: "",
      nominees: [],
      timesOfNomination: [],
      labelButton: "CRUSHING IT!",
      winnerWins: "",
      winnerNominations: ""
    });
  } 

  //Reset votes in firebase DB
  resetVotesFB() {
    var fbObj = fbRef.ref();
    fbObj.once('value', snapshot => {

      snapshot.forEach((childSnapshot) => {
        childSnapshot.ref.child("votes").remove();
      });
    });
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
