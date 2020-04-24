// jshint esversion: 6
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hamburger-react-maxi.firebaseio.com/'
});

export default instance;
