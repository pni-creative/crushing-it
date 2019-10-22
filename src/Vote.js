import React from 'react'
import fbRef from './databaseRT';

class Vote extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }



writeUserData(userID) {
var newChildRef = fbRef.ref(userID + '/votes/').push();
  newChildRef.set({
    plus_one: true
  });
}

readData() {
  const refObj = fbRef.ref();
  
refObj.on('value', snapshot => console.log('pojo', snapshot.val()));
}


  componentDidMount() {

    //this.writeUserData(true);

    this.readData();
    var topUserPostsRef = fbRef.ref().orderByChild('name');
    topUserPostsRef.once('value', snapshot => {

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
        <li key={i} onClick={() => this.writeUserData(items.id)} className="vote-list-item">{items.name}</li>
      );
    return <ul className="vote-list">{listItems}</ul>

  }
}

export default Vote
