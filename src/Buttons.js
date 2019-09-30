import React from 'react';

class Buttons extends React.Component {
    render () {
        return (
            <div>
                <button onClick={this.props.onClick}>{this.props.label}</button>
            </div>
        )
    }
}

export default Buttons;