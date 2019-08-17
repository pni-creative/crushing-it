import React from 'react';

class Buttons extends React.Component {
    render () {
        return (
            <div>
                <button className={this.props.hideButton} onClick={this.props.handleWinner}>CRUSHING IT!!</button>
                <button className={this.props.hideStartButton} onClick={this.props.startAgain}>Start Again</button> 
            </div>
        )
    }
}

export default Buttons;