import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import { unsetUser } from "./usersSlice.ts";
import { RootState } from "../../app/store.ts";

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
    'users/register',
    async (registerMutation, { rejectWithValue }) => {
        const formData = new FormData();

        const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

        keys.forEach(key => {
            const value = registerMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            const response = await axiosApi.post<RegisterResponse>('/users', formData);
            return response.data.user;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 422) {
                return rejectWithValue(error.response.data as ValidationError);
            }

            throw error;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }

            throw e;
        }
    }
);

export const googleLogin = createAsyncThunk<User, string, {rejectValue: GlobalError}>(
    'users/googleLogin',
    async (credential, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/google', {credential});
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }

            throw e;
        }
    }
);

export const logout = createAsyncThunk<void, undefined, {state: RootState}>(
    'users/logout',
    async (_, {dispatch}) => {
        await axiosApi.delete('/users/sessions');
        dispatch(unsetUser());
    }
);