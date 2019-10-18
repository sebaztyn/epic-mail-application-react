import axios from 'axios';

export const handleInput = event => {
  const { name, value } = event.target;
  return {
    type: "NEW_GROUP_INPUT",
    payload: {
      [name]: value
    }
  };
};

export const submitForm = groupName => dispatch => {
  const url = "http://localhost:3000/api/v1/groups";
  const data = {name: groupName};
  const options = {
    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
  }
  return (
    axios.post(url, data, options)
      .then(response => {
          const {data} = response;
          dispatch({
            type: "CREATE_A_NEW_GROUP",
            payload:{
              individualGroup: data.data,
              errorMessage: "",
              name: ""
            }
          })
      })
      .catch(err =>{
        const {error} = err.response.data;
        dispatch({
          type: "CREATE_A_NEW_GROUP",
          payload:{
            errorMessage: error,
            individualGroup: {}
          }
        })
      })
  );
};
// return {
//   type: 'CREATE_A_NEW_GROUP',
//   payload:{
//     name: groupName
//   }
// }
