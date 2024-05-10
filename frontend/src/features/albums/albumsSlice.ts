import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createAlbum, deleteAlbum, fetchAlbums, togglePublished} from "./albumsThunks.ts";
import {RootState} from "../../app/store.ts";

interface AlbumState {
    items: Album[],
    fetchLoading: boolean;
    createLoading: boolean;
    publishing: boolean;
    deleting: boolean;
}

const initialState: AlbumState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    publishing: false,
    deleting: false,
};

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
            state.fetchLoading = false;
            state.items = albums;
        });
        builder.addCase(fetchAlbums.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createAlbum.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createAlbum.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createAlbum.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(togglePublished.pending, (state) => {
            state.publishing = true;
        });
        builder.addCase(togglePublished.fulfilled, (state, {payload}) => {
            state.publishing = false;
            const index = state.items.findIndex(album => album._id === payload._id);
            if (index !== -1) {
                state.items[index].isPublished = payload.isPublished;
            }
        });
        builder.addCase(togglePublished.rejected, (state) => {
            state.publishing = false;
        });
        builder.addCase(deleteAlbum.pending, (state) => {
            state.deleting = true;
        });
        builder.addCase(deleteAlbum.fulfilled, (state, action) => {
            state.deleting = false;
            state.items = state.items.filter(item => item._id !== action.meta.arg);
        });
        builder.addCase(deleteAlbum.rejected, (state) => {
            state.deleting = false;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectFetchLoading = (state: RootState) => state.albums.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.albums.createLoading;
export const selectPublishing = (state: RootState) => state.albums.publishing;
export const selectDeleting = (state: RootState) => state.albums.deleting;