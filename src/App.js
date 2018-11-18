import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { authenticateUser } from './actions/authActions';
import { getProfile } from './actions/profileActions';

import PrivateRoute from './components/Common/PrivateRoute/PrivateRoute';

import Login from './components/Login/Login';

import Profile from './components/Profile/Profile';

import Register from './components/Register/Register';

import Feed from './components/Feed/Feed';
import Footer from './components/Footer/Footer';
import Landing from './components/Landing/Landing';
import Navigation from './components/Navigation/Navigation';

import Search from './components/Search/Search/Search';

import './App.css';

class App extends Component {

  //Validating the auth token
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      axios.get('https://lit-citadel-92787.herokuapp.com/api/auth/authenticate', {
        headers: {
          "Authorization": token
        }
      })
        .then(res => {
          if (res) {
            this.props.authenticateUser(res.data);
            this.props.getProfile(res.data.user_id, token);
          }
        })
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navigation />
          <main className="app__body">
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Switch>
              <PrivateRoute exact path='/feed' component={Feed} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/search' component={Search} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/profile' component={Profile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/profile/:id' component={Profile} />
            </Switch>
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default connect(null, { authenticateUser, getProfile })(App);
