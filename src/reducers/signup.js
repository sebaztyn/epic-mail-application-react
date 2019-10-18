const signupInitialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  recoveryEmail: "",
  errorMessage: "",
  active: false
};
const signupReducer = (state = signupInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ACTIVE":
      return { ...state, ...payload };
    case "INPUT_USER_DATA":
      return { ...state, ...payload };
    case "CREATE_USER_ERROR":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default signupReducer;
