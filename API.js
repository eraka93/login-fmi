import axios from 'axios';

const client = axios.create({
  baseURL: 'http://fmiposao.herokuapp.com/api/',
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = "X-CSRFTOKEN";


client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response === 403) {
    if (error.response.data.detail === "Authentication credentials were not provided.") {
      localStorage.removeItem("user");
    }

  }
  return Promise.reject(error);
});

export default client;
