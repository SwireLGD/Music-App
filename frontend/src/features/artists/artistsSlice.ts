import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createArtist, deleteArtist, fetchArtists, togglePublished} from "./artistsThunks.ts";
import {RootState} from "../../app/store.ts";

interface ArtistsState {
    items: Artist[];
    fetchLoading: boolean;
    createLoading: boolean;
    publishing: boolean;
    deleting: boolean;
}

const initialState: ArtistsState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    publishing: false,
    deleting: false,
};

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
            state.fetchLoading = false;
            state.items = artists;
        });
        builder.addCase(fetchArtists.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createArtist.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createArtist.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createArtist.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(togglePublished.pending, (state) => {
            state.publishing = true;
        });
        builder.addCase(togglePublished.fulfilled, (state, {payload}) => {
            state.publishing = false;
            const index = state.items.findIndex(artist => artist._id === payload._id);
            if (index !== -1) {
                state.items[index].isPublished = payload.isPublished;
            }
        });
        builder.addCase(togglePublished.rejected, (state) => {
            state.publishing = false;
        });
        builder.addCase(deleteArtist.pending, (state) => {
            state.deleting = true;
        });
        builder.addCase(deleteArtist.fulfilled, (state, action) => {
            state.deleting = false;
            state.items = state.items.filter(item => item._id !== action.meta.arg);
        });
        builder.addCase(deleteArtist.rejected, (state) => {
            state.deleting = false;
        });
    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.artists.createLoading;
export const selectPublishing = (state: RootState) => state.albums.publishing;
export const selectDeleting = (state: RootState) => state.albums.deleting;