import React, { useEffect, useState } from "react";
import { AlbumMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectArtists } from "../../artists/artistsSlice";
import { fetchArtists } from "../../artists/artistsThunks";
import { Button, CircularProgress, Grid, MenuItem, TextField } from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import { selectCreateLoading } from "../albumsSlice";

interface Props {
    onSubmit: (mutation: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isCreating = useAppSelector(selectCreateLoading);
    const [state, setState] = useState<AlbumMutation>({
        title: '',
        image: null,
        issueDate: 0,
        artist: '',
    });

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'issueDate') {
            const timestamp = new Date(value).getTime() / 1000;
            setState(prevState => ({
              ...prevState,
              [name]: timestamp
            }));
        } else {
            setState(prevState => {
                return {...prevState, [name]: value};
            });
        } 
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                <TextField
                    select
                    id="artist" label="Artist"
                    value={state.artist}
                    onChange={inputChangeHandler}
                    name="artist"
                    required
                >
                    <MenuItem value="" disabled>Please select an Artist</MenuItem>
                    {artists.map(artist => (
                        <MenuItem
                            key={artist._id}
                            value={artist._id}
                        >
                        {artist.name}
                        </MenuItem>
                    ))}
                </TextField>
                </Grid>
                <Grid item xs>
                <TextField
                    id="title" label="Title"
                    value={state.title}
                    onChange={inputChangeHandler}
                    name="title"
                    required
                />
                </Grid>

                <Grid item xs>
                <TextField
                    id="issueDate"
                    label="Date of issue"
                    type="date" 
                    value={new Date(state.issueDate * 1000).toISOString().slice(0, 10)}
                    onChange={inputChangeHandler}
                    name="issueDate"
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                </Grid>

                <Grid item xs>
                <FileInput
                    onChange={fileInputChangeHandler}
                    name="image"
                    label="Image"
                />
                </Grid>

                <Grid item xs>
                    {isCreating ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" color="primary" variant="contained">Create</Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default AlbumForm;