import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
//import { connect, useSelector, useDispatch } from "react-redux";
import Login from "./Login.jsx";
import { loginFetch } from "../actions/login";
import Signup from "./Signup.jsx";
// import classes from "../css/mainIndex.module.scss";

const MainIndex = () => {
  const [isChecked, toggleCheckbox] = useState(false);
  const handleToggle = () => toggleCheckbox(prevState => !prevState);
  return (
    <div className="flex flex-col sm:flex-row min-h-full items-center bg-gray-100 max-w-5xl mx-auto shadow-xl rounded-lg text-custom-blue">
      <div
        style={{ backgroundImage: `url("/assets/email-3249062.png")` }}
        className="flex flex-col justify-center flex-1 h-full bg-cover bg-center bg-fixed bg-no-repeat min-h-screen bg-gray-900 m-4 sm:h-screen"
      >
        <h2 className="text-6xl mb-6 font-bold text-gray-300 leading-relaxed uppercase">
          Welcome to EPIC Mail
        </h2>
        <p className="text-gray-300">
          Collaboration divides the task and multiplies the success
        </p>
      </div>
      <div className="flex-1 min-h-full m-4 sm:h-screen w-10/12">
        <div className="h-12 relative flex flex-row mb-8 form-buttons">
          <label
            htmlFor="mycheckbox"
            className="absolute left-0 top-0 bottom-0 w-full h-full text-gray-300 z-10"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
              className="invisible"
              id="mycheckbox"
            />
          </label>
          <span className="uppercase flex-1 self-center font-bold text-red-600 tracking-widest">
            login
          </span>
          <span className="uppercase flex-1 self-center font-bold text-red-600 tracking-widest">
            signup
          </span>
        </div>
        <h3>Communicate and Collaborate</h3>
        <h3>Welcome to EPIC Mail</h3>
        {isChecked !== true ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

// const handleSubmit = ({ userData, storeDispatcher, history }) => {
//   const { email, password } = userData;
//   const response = storeDispatcher(loginFetch({ email, password }));
//   response.then(() => {
//     return history.replace("/main");
//   });
// };

// const mapStateToProps = state => {
//   const { email, password, active, errorMessage } = state.login;
//   return {
//     email,
//     password,
//     active,
//     errorMessage
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     handleInputChange: () => dispatch(setLoginInput(event)),
//     submitUserData: userData => dispatch(loginFetch(userData))
//   };
// };

// const loginStore = useSelector(state => state.login);
// const dispatch = useDispatch();
// const history = useHistory();
// const { email, password } = loginStore;
// const requiredData = {
//   userData: { email, password },
//   storeDispatcher: dispatch,
//   history
// };

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(MainIndex)
// );

export default withRouter(MainIndex);
