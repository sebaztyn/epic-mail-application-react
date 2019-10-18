import React, { Component } from "react";
//import { signupFetch } from "./fetch";
import { connect } from "react-redux";
import Notification from "./Notification.jsx";
import { setErrorMessage, signupFetch, inputForm } from "../actions/signup";

class Signup extends Component {
  handleSignupSubmit = () => {
    const {
      firstName,
      lastName,
      username,
      email,
      recoveryEmail,
      password,
      confirm_password,
      setPasswordError,
      createUser
    } = this.props;
    const userData = {
      firstName,
      password,
      lastName,
      username,
      email,
      recoveryEmail
    };
    if (password !== confirm_password) return setPasswordError();
    return createUser(userData);
  };

  render() {
    const { active, handleInputChange, errorMessage } = this.props;

    return (
      <div>
        <h3>Communicate and Collaborate</h3>
        <h3>Welcome to EPIC Mail</h3>
        <form onSubmit={this.handleSignupSubmit} className="signup-box">
          <p className="box-message">Sign up for an Account Today</p>
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirm_password"
            onChange={handleInputChange}
            placeholder="Confirm Password"
          />
          <input
            type="email"
            name="recoveryEmail"
            onChange={handleInputChange}
            placeholder="Enter Recovery Email Address"
          />
          <Notification message={errorMessage} status={active} />
          <button onClick={this.handleSignupSubmit} type="button">
            Signup
          </button>{" "}
          <button type="reset">Reset</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state;
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    password: user.password,
    confirm_password: user.confirm_password,
    recoveryEmail: user.recoveryEmail,
    active: user.active,
    errorMessage: user.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPasswordError: () =>
      dispatch(setErrorMessage(true, "Passwords do not match. Try again")),
    handleInputChange: event => dispatch(inputForm(event)),
    dispatch,
    createUser: userData => dispatch(signupFetch(userData))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
