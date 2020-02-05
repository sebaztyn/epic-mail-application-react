import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

const Navbar = () => {
  const match = useRouteMatch();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={`${match.url}`}>Inbox</NavLink>{" "}
        </li>
        <li>
          <NavLink to={`${match.url}/unread`}>Unread</NavLink>{" "}
        </li>
        <li>
          <NavLink to={`${match.url}/sent`}>Sent</NavLink>{" "}
        </li>
        <li>
          <NavLink to={`${match.url}/create_message`}>Compose Message</NavLink>{" "}
        </li>
        <li>
          <NavLink to={`${match.url}/new_group`} >Create Group</NavLink>{" "}
        </li>
        <li>
          <NavLink to={`${match.url}/my_group`}>My Group</NavLink>{" "}
        </li>
        <li>
          <NavLink to={`${match.url}/deleted`}>Deleted</NavLink>{" "}
        </li>
        <li>
          <NavLink to={`${match.url}/draft`}>Draft</NavLink>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
