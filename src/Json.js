import React from 'react'
import db from './database';

class Json extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const result = await db.getJson();

    this.setState({
      data: result
    });
  }
	
  render() {
    return <pre>{this.state.data}</pre>
  }
}

export default Json
