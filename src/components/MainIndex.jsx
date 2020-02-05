import React from "react";
import { withRouter } from "react-router-dom";
// import classes from "../css/mainIndex.module.scss";

const MainIndex = ({ history }) => {
  const setRedirectLogin = () => {
    return history.push("/login");
  };
  const setRedirectSignup = () => {
    return history.push("/signup");
  };
  return (
    <div className="flex flex-col justify-center h-full items-center">
      <h2 className="text-6xl mb-6 font-bold text-custom-blue leading-relaxed uppercase">
        Welcome to EPIC Mail
      </h2>
      <p className="text-gray-700">
        {" "}
        Collaboration divides the task and multiplies the success
      </p>
      <div className="mt-4">
        <button onClick={setRedirectLogin} className="btn mr-4 shadow-2xl">
          Login
        </button>
        <button onClick={setRedirectSignup} className="btn shadow-2xl">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default withRouter(MainIndex);
