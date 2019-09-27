import React from 'react';

class Inputs extends React.Component {
    render () {
        return (
            <div>
                <input id="add" placeholder="Nominee" onChange={this.props.onChange} onKeyPress={this.props.onKeyPress} autoComplete="off"/>
                <input id="plus" defaultValue="1" onKeyPress={this.props.onKeyPress} onChange={this.props.quantityChange} autoComplete="off" type="number"/> 
            </div>
        )
    }
}

export default Inputs;