import React from 'react';
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

    const nominee = inputField.value;
    
    if(nominee.trim() !== "") {
      this.state.nominees.push(nominee);
      this.setState({nominees: this.state.nominees});
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
    var hideButton = this.state.winner === "" ? "show" : "hide";
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
            <input id="add" className={hideInput} placeholder="Nominee" onKeyPress={this.handleOnKeyPress.bind(this)} autocomplete="off"/> 

            <button className={hideButton} onClick={this.handleWinner.bind(this)}>CRUSHING IT!!</button>
            <button className={hideStartButton} onClick={this.startAgain.bind(this)}>Start Again</button>
          </div>
        </div>
        <div className="content">
          <ul>
            {nominees}
          </ul>
          
          
          <div className={show}>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
            <p>This week's winner is:</p>
            <p className="animated fadeInUp winner">{this.state.winner}!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
