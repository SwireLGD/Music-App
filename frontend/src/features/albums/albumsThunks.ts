import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album} from "../../types";
import axiosApi from "../../axiosApi.ts";


export const fetchAlbums = createAsyncThunk<Album[], string>(
    'fetchAlbums',
    async (artistId: string) => {
        const albumsResponse = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
        return albumsResponse.data;
    }
);