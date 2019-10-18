const loginFetch = loginData => {
  return fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
const signupFetch = formData => {
  return fetch("http://localhost:3000/api/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
const fetchGET = url => {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};

export { loginFetch, signupFetch, fetchGET };
