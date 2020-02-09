const initialLoginData = {
  email: "",
  password: "",
  errorMessage: "",
  active: false
};

const url =
  process.env.NODE_ENV === "production"
    ? "https://epic-mail-2018.herokuapp.com/api/v1"
    : "http://localhost:3000/api/v1";

export const loginFetch = (loginData = initialLoginData) => dispatch =>
  fetch(`${url}/auth/login`, {
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
        return response;
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
