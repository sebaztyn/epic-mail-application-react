import { navigate } from "@reach/router";

const initialLoginData = {
  email: "",
  password: "",
  errorMessage: "",
  active: false
};

export const loginFetch = (loginData = initialLoginData) => dispatch =>
  fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response.status === 201) {
        localStorage.setItem("token", response.data[0].token);
        localStorage.setItem("email", response.data[0].email);
        return navigate("/main/inbox");
      } else {
        return dispatch({
          type: "LOGIN_USER_ERROR",
          payload: { active: true, errorMessage: response.error }
        });
      }
    })
    .catch(error =>
      dispatch({
        type: "LOGIN_USER_ERROR",
        payload: { active: true, errorMessage: error.message }
      })
    );

export const setLoginStatus = (active, errorMessage) => {
  return {
    type: "SET_LOGIN_STATUS",
    payload: {
      active,
      errorMessage
    }
  };
};

export const setLoginInput = event => {
  const { name, value } = event.target;
  return {
    type: "SET_LOGIN_INPUT",
    payload: {
      [name]: value,
      active: false
    }
  };
};
