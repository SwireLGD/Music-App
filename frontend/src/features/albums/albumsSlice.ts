import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbums} from "./albumsThunks.ts";
import {RootState} from "../../app/store.ts";

interface AlbumState {
    items: Album[],
    fetchLoading: boolean;
}

const initialState: AlbumState = {
    items: [],
    fetchLoading: false,
}

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
    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectFetchLoading = (state: RootState) => state.albums.fetchLoading;