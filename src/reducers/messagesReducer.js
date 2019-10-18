const initialMessageState = {
  messages: [],
  individualMessage: {},
  emptyMessage: "",
  errorMessage: "",
  indexId: null,
  isLoading: true
};

export const messageReducer = (
  state = initialMessageState,
  { type, payload }
) => {
  switch (type) {
    case "GET_INBOX":
      return { ...state, ...payload };
    case "UPDATE_INBOX_MESSAGE_INDEX" || "UPDATE_UNREAD_MESSAGE_INDEX":
      return { ...state, ...payload };
    case "UPDATE_INBOX_MESSAGE_STATUS" || "UPDATE_UNREAD_MESSAGE_STATUS":
      return { ...state, ...payload };
    case "GET_ALL_SENT_MESSAGES":
      return { ...state, ...payload };
    case "GET_ONE_SENT_MESSAGE":
      return { ...state, ...payload };
    case "CLEAR_MESSAGE_STORE":
      return { ...state, ...payload };
    case "GET_ALL_UNREAD_MESSAGES":
      return { ...state, ...payload };
    default:
      return state;
  }
};

const createMessageDefaultValue = {
  email: "",
  subject: "",
  message: "",
  onSuccess: "",
  errorMessage: ""
};
export const createMessageReducer = (
  state = createMessageDefaultValue,
  { type, payload }
) => {
  switch (type) {
    case "CREATE_A_NEW_MESSAGE":
      return { ...state, ...payload };
    case "SEND_NEW_MESSAGE":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default messageReducer;
