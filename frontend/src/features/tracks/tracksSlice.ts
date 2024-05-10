import {Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createTrack, fetchTracks} from "./tracksThunks.ts";

interface TrackState {
    items: Track[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: TrackState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
            state.fetchLoading = false;
            state.items = tracks;
        });
        builder.addCase(fetchTracks.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createTrack.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createTrack.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createTrack.rejected, (state) => {
            state.createLoading = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectFetchLoading = (state: RootState) => state.tracks.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.tracks.createLoading;