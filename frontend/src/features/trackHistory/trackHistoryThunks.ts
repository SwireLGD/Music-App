import {createAsyncThunk} from "@reduxjs/toolkit";
import {PlayTrack} from "../../types";
import axiosApi from "../../axiosApi.ts";
import axios from "axios";

export const playTrack = createAsyncThunk(
    'trackHistory/playTrack',
    async ({trackId}: PlayTrack, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post('/track_history', {
                track: trackId });

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
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosApi.get('/track_history');

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