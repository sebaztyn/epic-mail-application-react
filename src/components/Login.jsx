import React, { Component } from "react";
//import { navigate } from "@reach/router";
import { withRouter, Redirect } from "react-router-dom";
//import { loginFetch } from "./fetch";
import classes from "../css/login.module.scss";
import { connect } from "react-redux";
import Notification from "./Notification.jsx";
import { setLoginInput, loginFetch } from "../actions/login";

class Login extends Component {
  handleSubmit = () => {
    const { email, password, submitUserData } = this.props;
    return submitUserData({ email, password }).then(response => {
      const { history } = this.props;
      if (response.status === 201) {
        return history.replace("/main");
      }
    });
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
      <div className={classes.test}>
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
          <button onClick={this.handleSubmit} className="btn">
            Login
          </button>{" "}
          <button
            onClick={() => this.props.history.push("/signup")}
            className="btn"
          >
            Signup
          </button>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
