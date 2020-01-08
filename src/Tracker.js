import React from 'react';
import db from './database';
import fbRef from './databaseRT';
import EmojiButton from '@joeattardi/emoji-button';

class Tracker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        leaderboard: [],
        allNames: []
    };
  }
  
  async componentDidMount() {
    document.body.classList.add("tracker");
    const leaderboard = await db.getLeaderBoard();
    this.setState({leaderboard: leaderboard})
    const allNames = await db.getAllNames();
    this.setState({allNames: allNames});
    //const buttons = document.getElementsByClassName('.emoji-button');
    const picker = new EmojiButton();
    let userEmojiBtnId;

    picker.on('emoji', emoji => {

      const userEmojibtnEl = document.querySelector('.emoji-button--' + userEmojiBtnId);

      userEmojibtnEl.innerHTML = emoji;
      var newChildRef = fbRef.database().ref('_race/' + userEmojiBtnId);
      newChildRef.update({
        avatar: emoji
      });
    });
      
      
    document.querySelectorAll('.emoji-button').forEach(function(button) {
      button.addEventListener('click', () => {
        picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
        if (picker.pickerVisible) {
          userEmojiBtnId = button.id;
          console.log(userEmojiBtnId);
        }
      });
    });
    
    
      
      
  }


  render () {
    return (
        <div>
          
          <ol className="">

            {this.state.leaderboard.map((leaderboard, i) => 
              <li key={i} className="">{leaderboard.user}: <br/>{leaderboard.nominations} nominations
                <button style={{display: "none"}} id={leaderboard.user} className={"emoji-button emoji-button--" + leaderboard.user}>
                  😀
                </button>
              </li>
            )}
          </ol>
        </div>
    )
  }
}

export default Tracker;
