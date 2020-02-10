export const setDisplayMessageDetails = (displayMessageDetail = false) => {
  return {
    type: "SET_DISPLAY_MESSAGE_DETAILS",
    payload: {
      displayMessageDetail
    }
  };
};
