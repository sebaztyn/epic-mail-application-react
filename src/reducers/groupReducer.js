const initialGroupState = {
  groups: [],
  individualGroup: {},
  message: "",
  onSuccess: "",
  errorMessage: "",
  name: ""
};
const groupReducer = (state = initialGroupState, { type, payload }) => {
  switch (type) {
    case "NEW_GROUP_INPUT":
      return { ...state, ...payload };
    case "CREATE_A_NEW_GROUP":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default groupReducer;
