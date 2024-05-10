import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, AlbumMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import axios from "axios";

export const fetchAlbums = createAsyncThunk<Album[], string>(
    'albums/fetchAlbums',
    async (artistId: string) => {
        const albumsResponse = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
        return albumsResponse.data;
    }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
    'albums/createAlbum',
    async (albumMutation) => {
        const formData = new FormData();

        const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];

        keys.forEach(key => {
            const value = albumMutation[key];
            if (value !== null) {
                formData.append(key, typeof value === 'number' ? value.toString() : value);
            }
        });

        const response = await axiosApi.post('/albums', formData);
        return response.data;
    }
);

export const togglePublished = createAsyncThunk<Album, string>(
    'albums/togglePublished',
    async (albumId, {rejectWithValue}) => {
        try {
            const response = await axiosApi.patch<Album>(`/albums/${albumId}/togglePublished`);
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

export const deleteAlbum = createAsyncThunk<void, string>(
   'albums/deleteAlbum',
   async(albumId, {rejectWithValue}) => {
        try {
            const response = await axiosApi.delete(`/albums/${albumId}`);

            if (response.status !== 204) {
                return rejectWithValue('Failed to delete the album');
            }

            return;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    if (e.response.status === 403) {
                        return rejectWithValue('Unauthorized to delete the album');
                    } else if (e.response.status === 404) {
                        return rejectWithValue('Album not found');
                    } else {
                        return rejectWithValue(e.response.data.message || 'server error during deletion');
                    }
                }
            }
            return rejectWithValue('Network error or unable to reach server');
        }
   }
);