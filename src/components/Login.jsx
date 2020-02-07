import React, { Component } from "react";
//import { navigate } from "@reach/router";
import { withRouter, Redirect } from "react-router-dom";
//import { loginFetch } from "./fetch";
import classes from "../css/login.module.scss";
import { connect } from "react-redux";
import Notification from "./Notification.jsx";
import { setLoginInput, loginFetch } from "../actions/login";

class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();
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
      <div className="">
        <p className="box-message">Got an Account? Enter your details below</p>
        <form action="" onSubmit={this.handleSubmit}>
          <div>
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              className="mt-3 px-3 py-1 w-8/12"
            />
            <br />
            <input
              onChange={handleInputChange}
              value={password}
              type="password"
              name="password"
              placeholder="Enter Password"
              className="mt-3 px-3 py-1 w-8/12"
            />
          </div>
          <Notification message={errorMessage} status={active} />
          <div className="mt-4 flex">
            <button type="submit" className="btn  mt-4 w-2/4 mx-auto">
              Login
            </button>
          </div>
        </form>
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
