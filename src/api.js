import axios from "axios";

const fetchData = (url, verb, ...others) => {
  const [data, config, params] = others;
  return axios({
    method: verb,
    url,
    params: params && params,
    data: data && data,
    headers: config && config
  });
};

export default fetchData;
