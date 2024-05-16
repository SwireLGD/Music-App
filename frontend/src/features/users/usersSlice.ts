import {GlobalError, User, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {googleLogin, login, register} from "./usersThunks.ts";
import {RootState} from "../../app/store.ts";

interface UsersState {
    user: User | null;
    registerError: ValidationError | null;
    loginError: GlobalError | null;
}

const initialState: UsersState = {
    user: null,
    registerError: null,
    loginError: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerError = null;
        });
        builder.addCase(register.fulfilled, (state, {payload: user}) => {
            state.user = user;
        });
        builder.addCase(register.rejected, (state, {payload: error}) => {
            state.registerError = error || null;
        });
        builder.addCase(login.pending, (state) => {
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, {payload: user}) => {
            state.user = user;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginError = error || null;
        });
        builder.addCase(googleLogin.pending, (state) => {
            state.loginError = null;
        });
        builder.addCase(googleLogin.fulfilled, (state, {payload: user}) => {
            state.user = user;
        });
        builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
            state.loginError = error || null;
        });
    }
});

export const {unsetUser} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;