import axios from "axios";

const Error = {
  UNAUTHORIZED: 401
};

const TIMEOUT = 5000;
const URL = `https://htmlacademy-react-3.appspot.com/six-cities`;

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
