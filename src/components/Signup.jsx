import React, { Component } from "react";
import { connect } from "react-redux";
import Notification from "./Notification.jsx";
import { setErrorMessage, signupFetch, inputForm } from "../actions/signup";

class Signup extends Component {
  handleSignupSubmit = e => {
    e.preventDefault();
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
    return createUser(userData).then(response => {
      const { history } = this.props;
      if (response.status === 201) {
        localStorage.setItem("token", response.data[0].token);
        return history.replace("/main");
      }
    });
  };

  render() {
    const { active, handleInputChange, errorMessage } = this.props;

    return (
      <form onSubmit={this.handleSignupSubmit}>
        <p className="box-message">Sign up for an Account Today</p>
        <input
          type="text"
          name="firstName"
          onChange={handleInputChange}
          placeholder="First Name"
          className="mt-3 px-3 py-1 w-8/12"
        />
        <br />
        <input
          type="text"
          name="lastName"
          onChange={handleInputChange}
          placeholder="Last Name"
          className="mt-3 px-3 py-1 w-8/12"
        />
        <br />
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          placeholder="Username"
          className="mt-3 px-3 py-1 w-8/12"
        />
        <br />
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          placeholder="Email Address"
          className="mt-3 px-3 py-1 w-8/12"
        />
        <br />
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Password"
          className="mt-3 px-3 py-1 w-8/12"
        />
        <br />
        <input
          type="password"
          name="confirm_password"
          onChange={handleInputChange}
          placeholder="Confirm Password"
          className="mt-3 px-3 py-1 w-8/12"
        />
        <br />
        <input
          type="email"
          name="recoveryEmail"
          onChange={handleInputChange}
          placeholder="Enter Recovery Email Address"
          className="mt-3 px-3 py-1 w-8/12"
        />
        <br />
        <Notification message={errorMessage} status={active} />
        <div className="mt-4 flex">
          <button type="submit" className="btn mr-4 flex-1">
            Signup
          </button>
          <button type="reset" className="btn flex-1">
            Reset
          </button>
        </div>
      </form>
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
    createUser: userData => dispatch(signupFetch(userData))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
