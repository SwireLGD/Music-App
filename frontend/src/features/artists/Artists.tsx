import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtists, selectFetchLoading} from "./artistsSlice.ts";
import {useEffect} from "react";
import {fetchArtists} from "./artistsThunks.ts";
import {CircularProgress, Grid} from "@mui/material";
import ArtistItem from "./components/ArtistItem.tsx";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isLoading = useAppSelector(selectFetchLoading);


    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <Grid container direction="column" gap={2}>
            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid item container gap={2}>
                    {artists.map(artist => (
                        <ArtistItem
                            key={artist._id}
                            id={artist._id}
                            name={artist.name}
                            image={artist.image}
                        />
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default Artists;