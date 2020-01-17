import React from 'react'
import fbRef from './databaseRT';
import * as firebaseui from 'firebaseui';

class Vote extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: [],
      myVotes: JSON.parse(localStorage.getItem('myVotes')) || [],
      myVotes2: 0,
      startVoting: null,
      signedIn: null,
      authID: null,
      startTime: parseInt(localStorage.getItem('startTime')) || 0,
      givenName: null
    }
  }

  writeUserData(userName, userID, authID) {
    var newChildRef = fbRef.database().ref(userID + '/votes/').push();
    newChildRef.set({
      plus_one: true
    });
    
    var votesRef = fbRef.database().ref(`_auth/${authID}/votes`);
    votesRef.transaction((currentVoteCount) => {
      return currentVoteCount + 1;
    });
    
    this.setState({
      myVotes2: this.state.myVotes2 + 1
    });
 
    this.setState({
      myVotes: [...this.state.myVotes, userName]    
    },
    () => {
      localStorage.setItem('myVotes', JSON.stringify(this.state.myVotes));
    })
  }

  componentDidMount() {
    
    
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        
          console.log(authResult.additionalUserInfo.profile);
      
          this.setState({
            authID: authResult.user.uid,
            givenName: authResult.additionalUserInfo.profile.givenName,
            signedIn: true
          });
      
          fbRef.database().ref(`_auth/${authResult.user.uid}/votes`).once("value", snapshot => {
            if (!snapshot.exists()) {

              fbRef.database().ref('_auth/' + authResult.user.uid).set({
                votes: 0
              });
            } else {
              this.setState({myVotes2: snapshot.val()});
            }
          });
      
          
        }.bind(this),
        
        uiShown: function() {
          // The widget is rendered.
          var elLong = document.querySelector('[data-provider-id="microsoft.com"] .firebaseui-idp-text-long');
          var elShort = document.querySelector('[data-provider-id="microsoft.com"] .firebaseui-idp-text-short');
          elLong.innerHTML = "Sign in with PNI email";
          elShort.innerHTML = "PNI email";
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/vote',
  signInOptions: [{provider: 'microsoft.com'}]
};

  var ui = new firebaseui.auth.AuthUI(fbRef.auth());
  ui.start('#firebaseui-auth-container', uiConfig);

    window.addEventListener('scroll', this.handleScroll);
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
  
  handleScroll() {
    var elements = document.getElementsByClassName('vote-name');
    for (var i = 0; i < elements.length; i++) {
      var requiredElement = elements[i];
      var rect = requiredElement.getBoundingClientRect();
      var elemTop = rect.top;
      var isVisible = (elemTop - 50 >= 0);
      if (!isVisible) {
        requiredElement.classList.add("blurrr");
      } else {
        requiredElement.classList.remove("blurrr");
      }
    } 
  }
	
  render() {
    const listItems = this.state.data.map((items, i) =>
        <button 
          className="vote-name"
          key={i} 
          onClick={() => this.writeUserData(items.name, items.id, this.state.authID)} 
          disabled={this.state.myVotes.includes(items.name) || this.state.myVotes2 >= 5}>{items.name} 
        </button>
      );
   const seeYouLater = <div className="vote-closed-wrapper"><p className="vote-closed">Voting is closed.</p></div>
   
   const greeting = <div className="greeting">Good afternoon, {this.state.givenName}</div>
   
   const headerBG = <div className="headerBG"></div>

   const voteCounter = <div className="hearts-wrapper">
                        <div className={this.state.myVotes2 >= 5 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes2 >= 4 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes2 >=3  ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes2 >=2 ? 'heart heart--empty' : 'heart'}></div>
                        <div className={this.state.myVotes2 >=1 ? 'heart heart--empty' : 'heart'}></div>
                       </div>
   
    return (

        <div className="vote-container">
          
          <div className="vote-list">
            
            {this.state.startVoting && this.state.signedIn ? headerBG : null}
            <header className="vote-header">
              {this.state.startVoting && this.state.signedIn ? greeting : null}
              {this.state.startVoting && this.state.signedIn ? voteCounter : null}
            </header>
            <div className="vote-main">
              {this.state.startVoting === true && this.state.signedIn ? listItems : null}
              {this.state.startVoting === false && this.state.signedIn ? seeYouLater : null}
              
              <div id="firebaseui-auth-container"></div>
              <div id="loader">Loading...</div>
            </div>
          </div>
        </div>

    );
  }
}

export default Vote
