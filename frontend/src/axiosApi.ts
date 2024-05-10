import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import {apiURL} from "./constants.ts";
import { RootState } from './app/store.ts';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
    baseURL: apiURL,
});

export default axiosApi;

export const addInterceptors = (store: Store<RootState>) => {

    axiosApi.interceptors.request.use((config) => {
      const token = store.getState().users.user?.token;
      const headers = config.headers as AxiosHeaders;

      headers.set('Authorization', token ? `Bearer ${token}` : undefined);
  
      return config;
    });
};