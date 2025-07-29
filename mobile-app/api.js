// api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.X:8000/api/', // Replace with your local IP
});
