import React from 'react'
import fbRef from './databaseRT';

class Vote extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: [],
      myVotes: JSON.parse(localStorage.getItem('myVotes')) || [],
      startVoting: null,
      startTime: parseInt(localStorage.getItem('startTime')) || 0
    }
  }

  writeUserData(userName, userID) {
    var newChildRef = fbRef.database().ref(userID + '/votes/').push();
    newChildRef.set({
      plus_one: true
    });
 
    this.setState({
      myVotes: [...this.state.myVotes, userName]    
    },
    () => {
      localStorage.setItem('myVotes', JSON.stringify(this.state.myVotes));
    })
  }

  componentDidMount() {
    document.documentElement.classList.add("vote");
    document.body.classList.add("vote");
    var startVoteRef = fbRef.database().ref('/_voteSession');
    startVoteRef.on('value', snapshot => {
      this.setState({startVoting: snapshot.val().isOpen});

      if (snapshot.val().startTime > this.state.startTime) {
        var timestamp = snapshot.val().startTime;
        this.setState({startTime: timestamp, myVotes: []});
        localStorage.removeItem("myVotes");
        localStorage.setItem('startTime', timestamp.toString());
      }
    });

    var namesRef = fbRef.database().ref('/_lineup').orderByChild('name');
    namesRef.once('value', snapshot => {

      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        this.setState(prevState => ({
          data: [...prevState.data, {id: childKey, name: childData.name}]
        }));
      });
    });
  }
	
  render() {
    const listItems = this.state.data.map((items, i) =>
        <p  
          className="vote-name"
          key={i} 
          onDoubleClick={() => this.writeUserData(items.name, items.id)} 
          disabled={this.state.myVotes.includes(items.name) || this.state.myVotes.length >= 5}>{items.name} 
        </p>
      );
   const seeYouLater = <div className="vote-closed-wrapper"><p className="vote-name">Voting is closed.</p></div>

   const voteCounter = <div>
                        <div className={this.state.myVotes.length === 5 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes.length >= 4 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes.length >=3  ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes.length >=2 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes.length >=1 ? 'heart heart--empty' : 'heart'}></div>
                       </div>
   
    return (

        <div className="vote-container">
          <div className="vote-list">
            <header className="vote-header">
              {this.state.startVoting ? voteCounter : null}
            </header>
            <div className="vote-main">
              {this.state.startVoting === true ? listItems : null}
              {this.state.startVoting === false ? seeYouLater : null}
            </div>
          </div>
        </div>

    );
  }
}

export default Vote
