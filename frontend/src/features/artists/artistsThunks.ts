import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import axios from "axios";

export const fetchArtists = createAsyncThunk<Artist[]>(
    'artists/fetchArtists',
    async () => {
        const artistsResponse = await axiosApi.get<Artist[]>('/artists');
        return artistsResponse.data;
    }
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
    'artists/createArtist',
    async (artistMutation) => {
        const formData = new FormData();

        const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];

        keys.forEach(key => {
            const value = artistMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        return axiosApi.post('/artists', formData);
    }
);

export const togglePublished = createAsyncThunk<Artist, string>(
    'artists/togglePublished',
    async (artistId, {rejectWithValue}) => {
        try {
            const response = await axiosApi.patch<Artist>(`/artists/${artistId}/togglePublished`);
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

export const deleteArtist = createAsyncThunk<void, string>(
   'artists/deleteArtist',
   async(artistId, {rejectWithValue}) => {
        try {
            const response = await axiosApi.delete(`/artists/${artistId}`);

            if (response.status !== 204) {
                return rejectWithValue('Failed to delete the artist');
            }

            return;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    if (e.response.status === 403) {
                        return rejectWithValue('Unauthorized to delete the artist');
                    } else if (e.response.status === 404) {
                        return rejectWithValue('Artist not found');
                    } else {
                        return rejectWithValue(e.response.data.message || 'server error during deletion');
                    }
                }
            }
            return rejectWithValue('Network error or unable to reach server');
        }
   }
);