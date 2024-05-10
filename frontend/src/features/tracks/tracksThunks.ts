import {createAsyncThunk} from "@reduxjs/toolkit";
import {Track, TrackMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import axios from "axios";

export const fetchTracks = createAsyncThunk<Track[], string>(
    'tracks/fetchTracks',
    async (albumId: string) => {
        const trackResponse = await axiosApi.get<Track[]>(`/tracks?album=${albumId}`);
        return trackResponse.data;
    }
);

export const createTrack = createAsyncThunk<void, TrackMutation>(
    'tracks/createTrack',
    async (trackMutation) => {
        const jsonData = JSON.stringify(trackMutation);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return axiosApi.post('/tracks', jsonData, config);
    }
);


export const togglePublished = createAsyncThunk<Track, string>(
    'tracks/togglePublished',
    async (trackId, {rejectWithValue}) => {
        try {
            const response = await axiosApi.patch<Track>(`/tracks/${trackId}/togglePublished`);
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

export const deleteTrack = createAsyncThunk<void, string>(
   'tracks/deleteTrack',
   async(trackId, {rejectWithValue}) => {
        try {
            const response = await axiosApi.delete(`/tracks/${trackId}`);

            if (response.status !== 204) {
                return rejectWithValue('Failed to delete the track');
            }

            return;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    if (e.response.status === 403) {
                        return rejectWithValue('Unauthorized to delete the track');
                    } else if (e.response.status === 404) {
                        return rejectWithValue('Track not found');
                    } else {
                        return rejectWithValue(e.response.data.message || 'server error during deletion');
                    }
                }
            }
            return rejectWithValue('Network error or unable to reach server');
        }
   }
);