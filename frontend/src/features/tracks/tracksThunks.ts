import {createAsyncThunk} from "@reduxjs/toolkit";
import { Track} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchTracks = createAsyncThunk<Track[], string>(
    'fetchTracks',
    async (albumId: string) => {
        const trackResponse = await axiosApi.get<Track[]>(`/tracks?album=${albumId}`);
        return trackResponse.data;
    }
);
