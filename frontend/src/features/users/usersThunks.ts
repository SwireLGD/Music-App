import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterMutation, RegisterResponse, User, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
            return response.data.user;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 422) {
                return rejectWithValue(error.response.data as ValidationError);
            }

            throw error;
        }
    }
);