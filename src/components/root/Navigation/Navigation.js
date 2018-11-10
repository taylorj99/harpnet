import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

import './Navigation.css';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //When true, this will show a dropdown below the "cogs" button
      dropDown: false
    }
  }

  //Event listener callback to toggle the dropdown menu
  toggleDropdown = (e) => {
    e.preventDefault();

    this.setState({
      dropDown: !this.state.dropDown
    })

    //Each menu button in the dropdown both toggles it and has an additional function. They are distinguished by their name value
    switch(e.target.name) {
      default:
        return null;

      case "logout": 
        this.logout();
        break;

      case "settings":
        this.props.history.push('/settings');
        break;
    }
  }

  //Will log a user out and redirect them to the homepage
  logout = (e) => {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    // The navigation bar will change depending on whether the user is logged in or not.
    const navItems = (!this.props.auth.isLoggedIn) ? 
      (
        <ul className="nav__list">
          <li className="nav__item nav__item--home">
            <Link className="nav__link nav__link--home" to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/register">Register</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/login">Login</Link>
          </li>
        </ul>
      )
      :
      (
        <ul className="nav__list">
          <li className="nav__item nav__item--home">
            <Link className="nav__link nav__link--home" to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/messages">Messages</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/notifications">Notifications</Link>
          </li>
          <li className="nav__item nav__item--logout">
            <button onClick={this.toggleDropdown} name="dropdown" className="nav__link nav__link--logout" type="button"><i class="nav__link--icon fas fa-cogs"></i></button>
          </li>
        </ul>
      )
    ;

    //The nav dropdown will only show for users that are logged in and when the dropDown state is true
    const navDropdown = (this.props.auth.isLoggedIn && this.state.dropDown) ? 
    (
      <ul className="nav__dropdown">
          <li className="nav__dropdown-item">
            <button onClick={this.toggleDropdown} name="settings" className="nav__dropdown-link">Settings</button>
          </li>
          <li className="nav__dropdown-item">
            <button onClick={this.toggleDropdown} name="logout" className="nav__dropdown-link">Logout</button>
          </li>
      </ul>
    ) :
    null;

    return (
      <nav className="nav">
        {navItems}
        {navDropdown}
      </nav>
    )
  }
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(Navigation));