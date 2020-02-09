import axios from "axios";

export const handleInput = event => {
  const { name, value } = event.target;
  return {
    type: "NEW_GROUP_INPUT",
    payload: {
      [name]: value
    }
  };
};
const url =
  process.env.NODE_ENV === "production"
    ? "https://epic-mail-2018.herokuapp.com/api/v1"
    : "http://localhost:3000/api/v1";
export const submitForm = groupName => dispatch => {
  const data = { name: groupName };
  const options = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };
  return axios
    .post(`${url}/groups`, data, options)
    .then(response => {
      const { data } = response;
      dispatch({
        type: "CREATE_A_NEW_GROUP",
        payload: {
          individualGroup: data.data,
          errorMessage: "",
          name: ""
        }
      });
    })
    .catch(err => {
      const { error } = err.response.data;
      dispatch({
        type: "CREATE_A_NEW_GROUP",
        payload: {
          errorMessage: error,
          individualGroup: {}
        }
      });
    });
};
