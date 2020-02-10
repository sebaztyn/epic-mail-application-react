const displayMessageInitialState = {
  displayMessageDetail: false
};
const displayMessageReducer = (
  state = displayMessageInitialState,
  { type, payload }
) => {
  switch (type) {
    case "SET_DISPLAY_MESSAGE_DETAILS":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default displayMessageReducer;
