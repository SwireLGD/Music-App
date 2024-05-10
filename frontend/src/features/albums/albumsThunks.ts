import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, AlbumMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

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

        return axiosApi.post('/albums', formData);
    }
);