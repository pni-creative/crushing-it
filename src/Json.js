import React from 'react'
var db = require("./database.js");

class Json extends React.Component {
	
  render() {
    return <pre id="data">{db.read('data')}</pre>
  }
}

export default Json
