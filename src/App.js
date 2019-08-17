import React from 'react';
import Winner from './Winner';
import Inputs from './Inputs';
import Buttons from './Buttons';
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nominees: [],
      winner: ""
    }
  }
  
  handleAdd() {
    var inputField = document.getElementById("add");
    var multipleField = document.getElementById("plus");

    const nominee = inputField.value;
    const multiplier = multipleField.value;

    if(multiplier.trim() !== "" && nominee.trim() !== "") {
      for(var i = 0; i < multiplier; i++) {
        this.state.nominees.push(nominee);
        this.setState({nominees: this.state.nominees});
      }
    } else if(nominee.trim() !== "") {
      this.state.nominees.push(nominee);
      this.setState({nominees: this.state.nominees});
    }

    inputField.value = "";
    multipleField.value = "";
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
          this.setState({winner: winner})
          this.setState({nominees: []})
        
      }, 500*timeMultiplier);
    }
  }
 }
  
  startAgain() {
    this.setState({winner: ""})
    this.setState({nominees: []})
  }
  
  removeNom(index) {
  var noms = [...this.state.nominees]; 
  if (index !== -1) {
    noms.splice(index, 1);
    this.setState({nominees: noms});
  }
}
  
  render () {
    var show = this.state.winner === "" ? "hide" : "show winner-container";
    var hideButton = this.state.nominees === "" ? "hide" : "show";
    var hideInput = this.state.winner === "" ? "show" : "hide";
    var hideStartButton = this.state.winner === "" ? "hide" : "show";
    
    const nominees = this.state.nominees.map((nominee, i) => {
      return (<li key={i} className="animated fadeInUp" onClick={() => this.removeNom(i)}> <span>&bull;</span> {nominee}</li>)
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
