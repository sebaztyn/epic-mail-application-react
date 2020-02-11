import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayMessageDetails } from "../actions/displayAction.js";

// export class MessageDetails extends Component {
//   render() {
//     const {
//       active,
//       subject,
//       how,
//       email,
//       message,
//       firstname,
//       lastname
//     } = this.props;
//     return (
//       <div
//         className="absolute lg:left-40 lg:w-3/4 h-full"
//         style={{ display: active ? "block" : "none" }}
//       >
//         <h3>
//           <strong>{subject}</strong>
//         </h3>
//         <p>
//           <strong>{how}</strong>{" "}
//           <em>{`${firstname} ${lastname} <${email}>`}</em>
//         </p>
//         <div>{message}</div>
//       </div>
//     );
//   }
// }

const MessageDetails = props => {
  const displayMessage = useSelector(
    state => state.displayMessage.displayMessageDetail
  );
  let dispatch = useDispatch();
  const { active, subject, how, email, message, firstname, lastname } = props;
  return (
    <div
      className={`absolute lg:left-40 xs:w-full md:w-full lg:w-3/5 h-full ${
        displayMessage === true
          ? "xs:block sm:block md:block"
          : "xs:hidden sm:hidden md:hidden"
      } md:block  ml-4 lg:ml-0 mr-10`}
      // style={{ display: active ? "block" : "none" }}
    >
      <div className="h-70">
        <h3>
          <strong>{subject}</strong>
        </h3>
        <p>
          <strong>{how}</strong>{" "}
          <em>{`${firstname} ${lastname} <${email}>`}</em>
        </p>
        <div>{message}</div>
      </div>
      <div className="h-30 w-90 mb-10">
        <textarea name="reply-message" className="h-full w-full"></textarea>
      </div>
    </div>
  );
};

export default MessageDetails;
