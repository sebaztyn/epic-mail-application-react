import React, { useState, useRef } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayMessageDetails } from "../actions/displayAction.js";

const Navbar = () => {
  const navRef = useRef();
  const [navHeight, setNavHeight] = useState(0);
  // const displayMessage = useSelector(state => state.displayMessage);
  let dispatch = useDispatch();
  const match = useRouteMatch();
  const openNavBarHandler = e => {
    if (e.currentTarget) {
      return setNavHeight(100);
    }
  };
  const closeNavBarHandler = e => {
    if (e.currentTarget) {
      return setNavHeight(0);
    }
  };
  const closeOnClick = () => {
    dispatch(setDisplayMessageDetails(false));
    return setNavHeight(0);
  };
  return (
    <div className="absolute top-0 mx-2 pt-2 pb-2 pr-2 md:flex-1 xs:w-full max-w-full lg:w-1/5 sm:w-2/5 h-full">
      <div
        className="w-10 h-10 xs:flex flex-col bg-gray-900 absolute left-0 top-0 m-2 hidden p-1 rounded-sm z-10 outline-none"
        onClick={openNavBarHandler}
        tabIndex="0"
        role="button"
      >
        <span className="w-8 h-3px bg-gray-300 inline-block m-auto"></span>
        <span className="w-8 h-2-7 bg-gray-300 inline-block m-auto"></span>
        <span className="w-8 h-3px bg-gray-300 inline-block m-auto"></span>
      </div>
      <nav
        className="sm:rounded-l-lg rounded-lg sm:rounded-r-none absolute overflow-y-hidden navbar w-11/12 sm:w-full z-20"
        style={{ height: `calc(${navHeight}% - 1rem)` }}
        ref={navRef}
      >
        <div
          className="w-10 h-8 flex flex-col bg-gray-300 absolute right-0 top-0 m-2 sm:hidden p-1 rounded-sm"
          onClick={closeNavBarHandler}
        >
          <span className="w-8 h-3px bg-gray-900 inline-block m-auto"></span>
          <span className="w-8 h-2-7 bg-gray-900 inline-block m-auto"></span>
        </div>
        <ul className="uppercase font-bold bg-gray-900 text-gray-400 flex flex-col justify-between h-full py-12 rounded-l-lg">
          <div className="h-half flex flex-col justify-around rounded-tl-lg">
            <li>
              <NavLink
                to={`${match.url}/create_message`}
                className="inline-block w-full h-full"
                onClick={closeOnClick}
              >
                New Message
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${match.url}`}
                className="inline-block w-full h-full"
                onClick={closeOnClick}
              >
                Inbox
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${match.url}/unread`}
                className="inline-block w-full h-full"
                onClick={closeOnClick}
              >
                Unread
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${match.url}/sent`}
                className="inline-block w-full h-full"
                onClick={closeOnClick}
              >
                Sent
              </NavLink>{" "}
            </li>
            <li>
              <NavLink
                to={`${match.url}/deleted`}
                className="inline-block w-full h-full"
                onClick={closeOnClick}
              >
                Deleted
              </NavLink>{" "}
            </li>
            <li>
              <NavLink
                to={`${match.url}/draft`}
                className="inline-block w-full h-full"
                onClick={closeOnClick}
              >
                Draft
              </NavLink>{" "}
            </li>
          </div>
          <div className="h-30 flex flex-col justify-around rounded-bl-lg">
            <li>
              <NavLink
                to={`${match.url}/new_group`}
                className="inline-block w-full h-full"
                onClick={closeOnClick}
              >
                Create Group
              </NavLink>{" "}
            </li>
            <li>
              <NavLink
                to={`${match.url}/my_group`}
                className="inline-block w-full h-full"
                onClick={closeOnClick}
              >
                My Group
              </NavLink>{" "}
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
