// eslint(react-hooks/exhaustive-deps)
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading.jsx";
import Message from "./Message.jsx";
import MessageDetails from "./MessageDetails.jsx";
import {
  inboxAction,
  updateIndividualMessage,
  updateMessageStatus,
  clearMessageStore
} from "../actions/messagesAction";
import { setDisplayMessageDetails } from "../actions/displayAction.js";

const InboxMessages = () => {
  const history = useHistory();
  let dispatch = useDispatch();
  let messageStore = useSelector(state => state.messageStore);
  let displayMessage = useSelector(
    state => state.displayMessage.displayMessageDetail
  );
  useEffect(() => {
    const fetchData = dispatch(inboxAction());
    const clearMessage = dispatch(clearMessageStore());
    const intervalFetch = setInterval(() => fetchData, 8000);
    return () => {
      clearInterval(intervalFetch);
      return clearMessage;
    };
  }, [dispatch]);
  // const [displayMessageDetail, setDisplayMessageDetail] = useState(false);
  if (!localStorage.getItem("token")) return history.push("/login");
  const {
    messages,
    individualMessage,
    emptyMessage,
    errorMessage,
    indexId,
    isLoading
  } = messageStore;
  const {
    sender_email,
    subject,
    message: msg,
    firstname,
    lastname
  } = individualMessage;
  const indexHandler = event => {
    dispatch(setDisplayMessageDetails(true));
    const id = event.currentTarget.dataset.id;
    const message = messages.find(msg => {
      return msg.message_id === id;
    });
    return new Promise((resolve, reject) => {
      resolve(dispatch(updateIndividualMessage(id, message)));
    })
      .then(() => dispatch(updateMessageStatus(individualMessage)))
      .catch(err => console.log(err.message));
  };
  const messageInbox = messages.map(message => (
    <Message
      {...message}
      key={message.message_id}
      clickHandler={indexHandler}
    />
  ));
  return (
    <div className="flex-1 lg:flex-3 pt-2 sm:left-40 lg:left-20 sm:absolute sm:w-3/5 lg:w-4/5 h-full xs:w-full mr-4">
      <div
        className={`pr-2 absolute top-0 left-0 h-full xs:w-full sm:w-full lg:w-2/5 overflow-y-auto overflow-x-hidden ${
          displayMessage === true
            ? "xs:hidden sm:hidden md:hidden"
            : "xs:block sm:block md:block"
        } lg:block`}
      >
        <div className="uppercase text-gray-300 bg-gray-900 font-bold mt-2 mx-auto h-10 flex justify-center items-center w-10/12 sm:w-11/12 mb-4 xs:rounded-t-lg sm:rounded-tr-lg">
          inbox
        </div>
        {isLoading === true && <Loading />}
        {emptyMessage ? (
          <p>{emptyMessage}</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          messageInbox
        )}
      </div>
      {indexId ? (
        <MessageDetails
          active={indexId}
          email={sender_email}
          subject={subject}
          message={msg}
          firstname={firstname}
          lastname={lastname}
          how="From:"
        />
      ) : null}
    </div>
  );
};

export default InboxMessages;
