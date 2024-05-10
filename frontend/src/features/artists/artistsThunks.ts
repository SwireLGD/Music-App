import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchArtists = createAsyncThunk<Artist[]>(
    'fetchArtists',
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