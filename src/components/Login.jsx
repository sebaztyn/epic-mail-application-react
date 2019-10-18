import React, { Component } from "react";
import { navigate } from "@reach/router";
//import { loginFetch } from "./fetch";
import { connect } from "react-redux";
import Notification from "./Notification.jsx";
import { setLoginInput, loginFetch } from "../actions/login";

class Login extends Component {
  handleSubmit = () => {
    const { email, password, submitUserData } = this.props;
    return submitUserData({ email, password });
  };

  render() {
    const {
      email,
      password,
      active,
      handleInputChange,
      errorMessage
    } = this.props;
    return (
      <div>
        <h3>Communicate and Collaborate</h3>
        <h3>Welcome to EPIC Mail</h3>
        <div className="login-box">
          <p className="box-message">
            Got an Account? Enter your details below
          </p>
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
          />
          <input
            onChange={handleInputChange}
            value={password}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <Notification message={errorMessage} status={active} />
          <button onClick={this.handleSubmit}>Login</button>{" "}
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { email, password, active, errorMessage } = state.login;
  return {
    email,
    password,
    active,
    errorMessage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleInputChange: () => dispatch(setLoginInput(event)),
    submitUserData: userData => dispatch(loginFetch(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
