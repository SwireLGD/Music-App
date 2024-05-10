import {createAsyncThunk} from "@reduxjs/toolkit";
import {Track, TrackMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

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
        const formData = new FormData();

        const keys = Object.keys(trackMutation) as (keyof TrackMutation)[];

        keys.forEach(key => {
            const value = trackMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        return axiosApi.post('/tracks', formData);
    }
);