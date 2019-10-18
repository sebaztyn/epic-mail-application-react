import { fetchGET } from "../components/fetch";

export const inboxAction = () => dispatch =>
  fetchGET("http://localhost:3000/api/v1/messages").then(response => {
    if (response.data) {
      return dispatch({
        type: "GET_INBOX",
        payload: {
          messages: response.data,
          emptyMessage: "",
          errorMessage: "",
          isLoading: false
        }
      });
    }
    if (response.message) {
      return dispatch({
        type: "GET_INBOX",
        payload: {
          messages: [],
          emptyMessage: response.message,
          errorMessage: "",
          isLoading: false
        }
      });
    }
    if (response.error) {
      return dispatch({
        type: "GET_INBOX",
        payload: {
          messages: [],
          emptyMessage: "",
          errorMessage: response.error,
          isLoading: false
        }
      });
    }
  });

export const updateIndividualMessage = (id = null, message = {}) => ({
  type: "UPDATE_INBOX_MESSAGE_INDEX" || "UPDATE_UNREAD_MESSAGE_INDEX",
  payload: {
    indexId: +id,
    individualMessage: message
  }
});

export const updateMessageStatus = (messageObject = {}) => dispatch => {
  const { status, message_id } = messageObject;
  if (status === "unread") {
    return fetchGET(`http://localhost:3000/api/v1/messages/${message_id}`)
      .then(response => {
        if (response.data) {
          dispatch({
            type:
              "UPDATE_INBOX_MESSAGE_STATUS" || "UPDATE_UNREAD_MESSAGE_STATUS",
            payload: {
              individualMessage: response.data[0]
            }
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};

export const getSentMessages = () => dispatch =>
  fetchGET("http://localhost:3000/api/v1/messages/sent")
    .then(response => {
      if (response.data) {
        return dispatch({
          type: "GET_ALL_SENT_MESSAGES",
          payload: {
            messages: response.data,
            emptyMessage: "",
            errorMessage: "",
            isLoading: false
          }
        });
      }
      if (response.message) {
        return dispatch({
          type: "GET_ALL_SENT_MESSAGES",
          payload: {
            messages: [],
            emptyMessage: response.message,
            errorMessage: "",
            isLoading: false
          }
        });
      }
      if (response.error) {
        return dispatch({
          type: "GET_ALL_SENT_MESSAGES",
          payload: {
            messages: [],
            emptyMessage: "",
            errorMessage: response.error,
            isLoading: false
          }
        });
      }
    })
    .catch(err => console.log(err.message));

export const getOneSentMessage = (id = null, message = {}) => {
  return {
    type: "GET_ONE_SENT_MESSAGE",
    payload: {
      indexId: id,
      individualMessage: message
    }
  };
};

export const fetchAllUnreadMessages = () => dispatch =>
  fetchGET("http://localhost:3000/api/v1/messages/unread")
    .then(response => {
      if (response.data) {
        return dispatch({
          type: "GET_ALL_UNREAD_MESSAGES",
          payload: {
            messages: response.data,
            emptyMessage: "",
            errorMessage: "",
            isLoading: false
          }
        });
      }
      if (response.message) {
        return dispatch({
          type: "GET_ALL_UNREAD_MESSAGES",
          payload: {
            messages: [],
            emptyMessage: response.message,
            errorMessage: "",
            isLoading: false
          }
        });
      }
      if (response.error) {
        return dispatch({
          type: "GET_ALL_UNREAD_MESSAGES",
          payload: {
            messages: [],
            emptyMessage: "",
            errorMessage: response.error,
            isLoading: false
          }
        });
      }
    })
    .catch(err => console.log(err));

export const clearMessageStore = () => {
  return {
    type: "CLEAR_MESSAGE_STORE",
    payload: {
      messages: [],
      individualMessage: {},
      emptyMessage: "",
      errorMessage: "",
      indexId: null,
      isLoading: true
    }
  };
};

export const createMessageInputAction = event => {
  const { name, value } = event.target;
  return {
    type: "CREATE_A_NEW_MESSAGE",
    payload: {
      [name]: value
    }
  };
};

export const submitNewMessage = formData => dispatch =>
  fetch("http://localhost:3000/api/v1/messages", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response.data) {
        return dispatch({
          type: "SEND_NEW_MESSAGE",
          payload: {
            email: "",
            subject: "",
            message: "",
            onSuccess: "Message sent successfully",
            errorMessage: ""
          }
        });
      }
      if (response.error) {
        return dispatch({
          type: "SEND_NEW_MESSAGE",
          payload: {
            onSuccess: "",
            errorMessage: response.error
          }
        });
      }
    })
    .catch(err =>
      dispatch({
        type: "SEND_NEW_MESSAGE",
        payload: {
          onSuccess: "",
          errorMessage: err.message
        }
      })
    );
