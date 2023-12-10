import axios from 'axios';

const headers = {
  Authorization: `Basic ${process.env.API_KEY_D_ID}`,
  'Content-Type': 'application/json',
};

const apiUrl = process.env.D_ID_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: headers,
});
