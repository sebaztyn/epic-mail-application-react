import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import signupReducer from "../reducers/signup";
import loginReducer from "../reducers/login";
import messageReducer, {
  createMessageReducer
} from "../reducers/messagesReducer";
import groupReducer from "../reducers/groupReducer";
import displayMessageReducer from "../reducers/displayMessageReducer.js";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    recoveryEmail: "",
    errorMessage: "",
    active: false
  },
  login: {
    email: "",
    password: "",
    errorMessage: "",
    active: false
  },
  messageStore: {
    messages: [],
    individualMessage: {},
    emptyMessage: "",
    errorMessage: "",
    indexId: null,
    isLoading: true
  },
  createMessage: {
    email: "",
    subject: "",
    message: "",
    onSuccess: "",
    errorMessage: ""
  },
  groupStore: {
    groups: [],
    individualGroup: {},
    message: "",
    onSuccess: "",
    errorMessage: "",
    name: ""
  },
  displayMessage: {
    displayMessageDetail: false
  }
};
const allReducers = combineReducers({
  user: signupReducer,
  login: loginReducer,
  messageStore: messageReducer,
  createMessage: createMessageReducer,
  groupStore: groupReducer,
  displayMessage: displayMessageReducer
});
const store = createStore(
  allReducers,
  initialState,
  composeWithDevTools(compose(applyMiddleware(thunk)))
);
export default store;
