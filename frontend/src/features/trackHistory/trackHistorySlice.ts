import {PlayedTrack} from "../../types";
import {fetchTrackHistory} from "./trackHistoryThunks.ts";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";

interface TrackHistoryState {
    items: PlayedTrack[];
    fetchLoading: boolean;
}

const initialState: TrackHistoryState = {
    items: [],
    fetchLoading: false,
};

export const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTrackHistory.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTrackHistory.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchTrackHistory.rejected, (state) => {
                state.fetchLoading = false;
        });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectTrackHistory = (state: RootState) => state.trackHistory.items;
export const selectTrackHistoryLoading = (state: RootState) => state.trackHistory.fetchLoading;
