import axios from 'axios';
import {apiURL} from "./constants.ts";

const axiosApi = axios.create({
    baseURL: apiURL,
});

export default axiosApi;