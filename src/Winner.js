import React from 'react';

class Winner extends React.Component {
    render () {
        return (
            <div className={this.props.hide}>
                {
                    [...Array(10)].map ( (i) => {
                        return <div key={i} className="confetti"></div>
                    })

                }
                <p>This week's winner is:</p>
                <p className="animated fadeInUp winner">{this.props.winner}!</p>
          </div>
        )
    }
}

export default Winner;