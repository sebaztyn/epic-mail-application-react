import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import Loading from "./Loading.jsx";
import Message from "./Message.jsx";
import MessageDetails from "./MessageDetails.jsx";
import {
  inboxAction,
  updateIndividualMessage,
  updateMessageStatus,
  clearMessageStore
} from "../actions/messagesAction";
import { useSelector, useDispatch } from "react-redux";

const InboxMessages = () => {
  let dispatch = useDispatch();
  let messageStore = useSelector(state => state.messageStore);
  useEffect(() => {
    const fetchData = dispatch(inboxAction());
    const clearMessage = dispatch(clearMessageStore());
    const intervalFetch = setInterval(() => fetchData, 8000);
    fetchData;
    return () => {
      clearInterval(intervalFetch);
      return clearMessage;
    };
  }, [dispatch]);
  if (!localStorage.getItem("token")) return navigate("/login");
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
    <div className="flex-1 lg:flex-3 pt-2 md:left-40 lg:left-20 sm:absolute md:w-1/2 lg:w-4/5 h-full xs:w-full">
      <div className="pr-2 absolute top-0 left-0 md:h-full md:w-full lg:w-2/5 overflow-y-auto overflow-x-hidden">
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
