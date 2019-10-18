const loginInitialState = {
  email: "",
  password: "",
  errorMessage: "",
  active: false
};
const loginReducer = (state = loginInitialState, { type, payload }) => {
  switch (type) {
    case "SET_LOGIN_STATUS":
      return { ...state, ...payload };
    case "LOGIN_USER_ERROR":
      return { ...state, ...payload };
    case "SET_LOGIN_INPUT":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default loginReducer;
