import React, { Component } from "react";

export class MessageDetails extends Component {
  render() {
    const {
      active,
      subject,
      how,
      email,
      message,
      firstname,
      lastname
    } = this.props;
    return (
      <div
        className="display-message"
        style={{ display: active ? "block" : "none" }}
      >
        <h3>
          <strong>{subject}</strong>
        </h3>
        <p>
          <strong>{how}</strong>{" "}
          <em>{`${firstname} ${lastname} <${email}>`}</em>
        </p>
        <div>{message}</div>
      </div>
    );
  }
}

export default MessageDetails;
