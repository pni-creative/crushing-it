import React from 'react';
import db from './database';

class Leaderboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        leaderboard: [],
    };
  }
  
  async componentDidMount() {
      const leaderboard = await db.getLeaderBoard();
      this.setState({leaderboard: leaderboard})
  }

  render () {
    return (
        <div class="leaderboard">
            <h1 className="leaderboard-title">
                Leaderboard
            </h1>
            <ol>
                {this.state.leaderboard.map((leaderboard, i) => 
                    <li key={i}>
                        <p className="name">{leaderboard.user} </p> <small>{leaderboard.total}</small>
                    </li>
                )}
            </ol>
            <div>
                <p>1 Win = 5pts</p>
                <p>1 Nomination = 1pt</p>
            </div>
        </div>
    )
  }
}

export default Leaderboard;
