import React from "react";

const Message = ({
  firstname,
  lastname,
  subject,
  message,
  message_id,
  clickHandler
}) => {
  return (
    /* eslint-disable-next-line */
    <div
      className="message-item"
      data-id={`${message_id}`}
      onClick={clickHandler}
    >
      <p>
        <em>
          {firstname} {lastname}
        </em>
      </p>
      <p>
        <strong>{subject}</strong>
      </p>
      <p>{message}</p>
      <hr />
    </div>
  );
};

export default Message;
