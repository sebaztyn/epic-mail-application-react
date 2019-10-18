import React from "react";

const Notification = ({ message, status }) => {
  return (
    <div style={{ display: status ? "block" : "none" }}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
