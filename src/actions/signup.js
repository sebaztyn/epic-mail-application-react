const initialUserState = {
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
export const signupFetch = (formData = initialUserState) => dispatch =>
  fetch("https://epic-mail-2018.herokuapp.com/api/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify(formData),
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
          type: "CREATE_USER_ERROR",
          payload: { active: true, errorMessage: response.error }
        });
      }
    })
    .catch(error =>
      dispatch({
        type: "CREATE_USER_ERROR",
        payload: { active: true, errorMessage: error.message }
      })
    );

export const setErrorMessage = (active, errorMessage) => {
  return {
    type: "SET_ACTIVE",
    payload: {
      active,
      errorMessage
    }
  };
};
export const inputForm = event => {
  const { name, value } = event.target;
  return {
    type: "INPUT_USER_DATA",
    payload: {
      active: false,
      [name]: value
    }
  };
};
