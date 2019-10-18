import React from 'react';
import db from './database';

class Winner extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      wins: 0, 
      nominations: 0,
    };
  }
  
   componentDidMount() {
    let name = this.props.winner;
    let nameUppercased = name.charAt(0).toUpperCase() + name.slice(1);
    if (this.props.isWinnerSet) {
      db.getProfile(name).then((result) => {
        let suffixedWinNumber = this.ordinalSuffixOf(result.wins);
        let suffixedNominationNumber = this.ordinalSuffixOf(result.nominations);
    
        this.setState({
          name: nameUppercased,
          wins: suffixedWinNumber, 
          nominations: suffixedNominationNumber
        });
      })
    }
  }

  ordinalSuffixOf = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }

    return i + "th";
  }

  render () {
    return (
      <div className="show winner-container">
          {
            [...Array(10)].map ( (i) => {
                return <div key={i} className="confetti"></div>
              })
          }
          <p>This week's winner is:</p>
          <p className="animated fadeInUp winner">{this.state.name}!</p>
          <p className="animated fadeInDown delay-1s">
            This is the {this.state.wins} win for {this.state.name} and {this.state.nominations} nomination.
          </p>
      </div>
    )
  }
}

export default Winner;
