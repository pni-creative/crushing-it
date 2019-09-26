import React from 'react'
var db = require("./database.js");

class Profile extends React.Component {
	
  render() {
    return <div className="profile-wrapper" id="data">
      <h2>{this.props.match.params.id}</h2>{db.profile('data', this.props.match.params.id)}
    </div>
  }
}

export default Profile
