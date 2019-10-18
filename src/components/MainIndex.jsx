import React from "react";
import { navigate } from "@reach/router";

const MainIndex = () => {
  const setRedirectLogin = () => {
    return navigate("/login");
  };
  const setRedirectSignup = () => {
    return navigate("/signup");
  };
  return (
    <div className="main-index">
      <h2>Welcome to EPIC Mail</h2>
      <p> Collaboration divides the task and multiplies the success</p>
      <button onClick={setRedirectLogin}>Login</button>
      <button onClick={setRedirectSignup}>Sign up</button>
    </div>
  );
};

export default MainIndex;
