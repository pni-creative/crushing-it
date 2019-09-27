import React from 'react';

class Nominee extends React.Component {

	constructor(props){
		super(props);
		console.log(props);
	}

    render () {
        return (
            <li className="animated fadeInUp" onClick={() => this.props.clickFn(this.key)}>{this.props.name}<span>{this.props.times}</span>
          </li>
        )
    }
}

export default Nominee;