import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import signupReducer from "../reducers/signup";
import loginReducer from "../reducers/login";
import messageReducer, {
  createMessageReducer
} from "../reducers/messagesReducer";
import groupReducer from "../reducers/groupReducer";
//import createMessageReducer from "../reducers/createMessageReducer";

//const middleware = [thunk]
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
  }
};
const allReducers = combineReducers({
  user: signupReducer,
  login: loginReducer,
  messageStore: messageReducer,
  createMessage: createMessageReducer,
  groupStore: groupReducer
});
const store = createStore(
  allReducers,
  initialState,
  compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
