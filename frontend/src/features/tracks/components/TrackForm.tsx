import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { TrackMutation } from "../../../types";
import { selectAlbums } from "../../albums/albumsSlice";
import { selectCreateLoading } from "../tracksSlice";
import { fetchAlbums } from "../../albums/albumsThunks";
import { Button, CircularProgress, Grid, MenuItem, TextField } from "@mui/material";
import { selectArtists } from "../../artists/artistsSlice";

interface Props {
    onSubmit: (mutation: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const artists = useAppSelector(selectArtists)
    const isCreating = useAppSelector(selectCreateLoading);
    const [selectedArtist, setSelectedArtist] = useState('');
    const [state, setState] = useState<TrackMutation>({
        title: '',
        duration: '',
        album: '',
    });

    useEffect(() => {
        if (selectedArtist) {
            dispatch(fetchAlbums(selectedArtist));
        }
    }, [dispatch, selectedArtist]);

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => {
            return {...prevState, [name]: value};
        }); 
    };

    const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedArtist(e.target.value);
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        select
                        label="Artist"
                        value={selectedArtist}
                        onChange={handleArtistChange}
                        name="artist"
                        required
                    >
                        <MenuItem value="" disabled>Please select an Artist</MenuItem>
                        {artists.map(artist => (
                            <MenuItem key={artist._id} value={artist._id}>
                                {artist.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        select
                        label="Album"
                        value={state.album}
                        onChange={inputChangeHandler}
                        name="album"
                        required
                        disabled={!selectedArtist}
                    >
                        <MenuItem value="" disabled>Please select an Album</MenuItem>
                        {albums.map(album => (
                            <MenuItem key={album._id} value={album._id}>
                                {album.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="title"
                        label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        required
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="duration"
                        label="Track duration"
                        value={state.duration}
                        onChange={inputChangeHandler}
                        name="duration"
                        required
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

export default TrackForm;