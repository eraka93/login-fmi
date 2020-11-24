import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'


const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = "X-CSRFTOKEN";


client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error.response);
  if (error.response.status === 403) {
    AsyncStorage.removeItem("user");
  }
  return Alert(error);
});

export default client;
