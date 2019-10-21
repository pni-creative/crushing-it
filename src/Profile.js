import React from 'react';
import db from './database';

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      wins: 0, 
      nominations: 0,
    };
  }
  
  async componentDidMount() {
    let name = this.props.match.params.id.toLowerCase();
    let nameUppercased = name.charAt(0).toUpperCase() + name.slice(1);
    const result = await db.getProfile(name);

    this.setState({
      name: nameUppercased,
      wins: result.wins, 
      nominations: result.nominations,
    });
  }
	
  render() {
    let pluralWin = (this.state.wins === 1) ? "win" : "wins";

    return (
      <div className="profile-wrapper" id="data">
        <h2>{this.state.name}</h2>
        <h3>Nominated {this.state.nominations} times</h3>
        <h3>{this.state.wins} {pluralWin}</h3>
      </div>
    )
  }
}

export default Profile
