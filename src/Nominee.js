import React from 'react';

class Nominee extends React.Component {
    render () {
        const nominees = this.props.timesOfNomination.map((value, i) => {
            const name = value.name;
            let times = "";
            let liStyle = {};

            times = value.times;
            
            if(times > 1) {
                liStyle = {
                fontSize: 25 + 3 * times + 'px',
                };
            } else {
                liStyle = {
                fontSize: '25px',
                };
            }
            return (<li key={i} style={liStyle} className="animated fadeInUp" onClick={() => this.props.clickFn(i)} > {name} <span>{times}</span></li>);
        });

        return (
            <ul>
                {nominees}
            </ul>
        )
    }
}

export default Nominee;