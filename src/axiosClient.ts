import axios from 'axios';

export const csBackendUrl = 'https://api.corona.studio';
export const csBackend = axios.create({
    baseURL: csBackendUrl,
});
