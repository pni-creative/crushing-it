import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Json from './Json';
import Profile from './Profile';
import Leaderboard from './Leaderboard';
import Vote from './Vote';
import Ninja from './Ninja';
import Race from './Race';
import Tracker from './Tracker';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>

      <Route exact path="/" component={App} />
      <Route path="/json" component={Json} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/leaderboard/" component={Leaderboard} />
      <Route exact path="/vote/" component={Vote} />
      <Route exact path="/ninja/" component={Ninja} />
      <Route exact path="/race/" component={Race} />
      <Route exact path="/tracker/" component={Tracker} />

    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
