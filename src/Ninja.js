import React from 'react'
import fbRef from './databaseRT';

class Ninja extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: [],
      myVotes: JSON.parse(localStorage.getItem('myVotes')) || [],
      startVoting: null,
      startTime: parseInt(localStorage.getItem('startTime')) || 0
    }
  }
  
  setVoteSession() {
  
    // remove any votes
    this.removeAllVotes();
    
    // open voting
    var startVoteRef = fbRef.database().ref('/_voteSession/');
    startVoteRef.set({
      isOpen: true,
      startTime: fbRef.database.ServerValue.TIMESTAMP
    });
  }
  
  cancelVotingInProgress() {
    var fbObj = fbRef.database().ref();

    fbObj.once('value').then( snapshot => {

      return snapshot.forEach((childSnapshot) => {
        childSnapshot.ref.child("votes").remove();
      });

    })
    .then(() => {
      this.closeVoting();
    });
  }
  
  removeAllVotes() {
    var fbObj = fbRef.database().ref();
    fbObj.once('value', snapshot => {

      snapshot.forEach((childSnapshot) => {
        childSnapshot.ref.child("votes").remove();
      });
    });
  }
  
  closeVoting() {
    var voteSessRef = fbRef.database().ref('/_voteSession/');
    voteSessRef.set({
      isOpen: false
    });
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
        <button 
          className="vote-name"
          key={i} 
          onDoubleClick={() => this.writeUserData(items.name, items.id)} 
          disabled={this.state.myVotes.includes(items.name) || this.state.myVotes.length >= 5}>{items.name} 
        </button>
      );

   const startVoteCTA = <button className="start-vote" onClick={() => this.setVoteSession()}>Open Voting</button>
   const voteInProgress = <p className="vote-in-progress" onClick={() => { if (window.confirm('Are you sure you want to delete all votes?')) this.cancelVotingInProgress() } } >Voting in progress</p>
   const voteCounter = <div>
                        <div className={this.state.myVotes.length === 5 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes.length >= 4 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes.length >= 3  ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes.length >= 2 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes.length >= 1 ? 'heart heart--empty' : 'heart'}></div>
                       </div>
   
    return (
      <div className="vote-container">
        <div className="vote-list">
          <header className="vote-header">
            {this.state.startVoting ? voteCounter : null}
          </header>
          <div className="vote-main">
           {this.state.startVoting === true ? listItems : null}
          </div>
          <footer className="vote-footer">
           {this.state.startVoting === true ? voteInProgress : null}
           {this.state.startVoting === false ? startVoteCTA : null}
          </footer>
        </div>
      </div>
    );
  }
}

export default Ninja
