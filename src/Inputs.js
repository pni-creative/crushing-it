import React from 'react';

class Inputs extends React.Component {
    render () {
        return (
            <div>
                <input id="add" className={this.props.hideInput} placeholder="Nominee" onKeyPress={this.props.onKeyPress} autoComplete="off"/>
                <input id="plus" className={this.props.hideInput} placeholder="+" onKeyPress={this.props.onKeyPress} autoComplete="off" type="number"/> 
            </div>
        )
    }
}

export default Inputs;