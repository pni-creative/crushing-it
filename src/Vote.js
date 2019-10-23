import React from 'react'
import fbRef from './databaseRT';

class Vote extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  writeUserData(userID, event) {
    var newChildRef = fbRef.ref(userID + '/votes/').push();
    newChildRef.set({
      plus_one: true
    });

    event.target.classList.add("vote-btn--disabled");
  }


  componentDidMount() {

    var namesRef = fbRef.ref('/_lineup').orderByChild('name');
    namesRef.once('value', snapshot => {

      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        console.log(childData.name);
        console.log(childKey);

        this.setState(prevState => ({
          data: [...prevState.data, {id: childKey, name: childData.name}]
        }));
      });
    });
  }
	
  render() {
    const listItems = this.state.data.map((items, i) =>
        <button 
          key={i} 
          onDoubleClick={(e) => this.writeUserData(items.id, e)}>{items.name}
        </button>
      );
    return <div className="vote-list">{listItems}</div>

  }
}

export default Vote
