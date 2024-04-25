import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchArtists = createAsyncThunk<Artist[]>(
    'fetchArtists',
    async () => {
        const artistsResponse = await axiosApi.get<Artist[]>('/artists');
        return artistsResponse.data;
    }
);