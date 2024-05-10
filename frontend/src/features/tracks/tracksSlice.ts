import {Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createTrack, deleteTrack, fetchTracks, togglePublished} from "./tracksThunks.ts";

interface TrackState {
    items: Track[];
    fetchLoading: boolean;
    createLoading: boolean;
    publishing: boolean;
    deleting: boolean;
}

const initialState: TrackState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    publishing: false,
    deleting: false,
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
        builder.addCase(togglePublished.pending, (state) => {
            state.publishing = true;
        });
        builder.addCase(togglePublished.fulfilled, (state, {payload}) => {
            state.publishing = false;
            const index = state.items.findIndex(track => track._id === payload._id);
            if (index !== -1) {
                state.items[index].isPublished = payload.isPublished;
            }
        });
        builder.addCase(togglePublished.rejected, (state) => {
            state.publishing = false;
        });
        builder.addCase(deleteTrack.pending, (state) => {
            state.deleting = true;
        });
        builder.addCase(deleteTrack.fulfilled, (state, action) => {
            state.deleting = false;
            state.items = state.items.filter(item => item._id !== action.meta.arg);
        });
        builder.addCase(deleteTrack.rejected, (state) => {
            state.deleting = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectFetchLoading = (state: RootState) => state.tracks.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.tracks.createLoading;
export const selectPublishing = (state: RootState) => state.albums.publishing;
export const selectDeleting = (state: RootState) => state.albums.deleting;