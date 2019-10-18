import React from "react";

const ViewGroup = ({ id, name, memberListHandler }) => {
  return (
    <div data-groupid={`${id}`}>
      <br />
      <p
        className="member-list"
        data-groupid={`${id}`}
        onClick={memberListHandler}
      >
        Click here to view group members
      </p>{" "}
      <hr />
      <p>{name}</p>
      <span>
        <i className="fa fa-edit tooltip">
          <span className="edit">Edit Group Name</span>
        </i>
      </span>
      <span>
        <i className="fa fa-user-plus tooltip">
          <span className="add-user">Add new User</span>
        </i>
      </span>
      <span>
        <i className="fa fa-trash tooltip">
          <span className="delete-group">Delete Group</span>
        </i>
      </span>
      <span>
        <i className="fa fa-envelope tooltip">
          <span className="group-message">Send Group Message</span>
        </i>
      </span>
    </div>
  );
};

export default ViewGroup;
