import {createAsyncThunk} from "@reduxjs/toolkit";
import {PlayTrack} from "../../types";
import axiosApi from "../../axiosApi.ts";
import axios from "axios";

export const playTrack = createAsyncThunk(
    'trackHistory/playTrack',
    async ({trackId, token}: PlayTrack, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post('/track_history', {
                track: trackId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            } else {
                return rejectWithValue({ error: 'An unknown error occurred' });
            }
        }
    }
);

export const fetchTrackHistory = createAsyncThunk(
    'trackHistory/fetchTrackHistory',
    async (token: string, {rejectWithValue}) => {
        try {
            const response = await axiosApi.get('/track_history', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            } else {
                return rejectWithValue({ error: 'An unknown error occurred' });
            }
        }
    }
);