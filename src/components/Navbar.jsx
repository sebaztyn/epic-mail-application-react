import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <nav>
      <Link to="inbox">Inbox</Link> <Link to="unread">Unread</Link>{" "}
      <Link to="sent">Sent</Link>{" "}
      <Link to="create_message">Compose Message</Link>{" "}
      <Link to="new_group">Create Group</Link>{" "}
      <Link to="my_group">My Group</Link> <Link to="deleted">Deleted</Link>{" "}
      <Link to="draft">Draft</Link>{" "}
    </nav>
  );
};

export default Navbar;
