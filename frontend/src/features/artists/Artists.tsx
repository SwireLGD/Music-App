import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtists, selectFetchLoading} from "./artistsSlice.ts";
import {useEffect} from "react";
import {fetchArtists} from "./artistsThunks.ts";
import {CircularProgress, Grid} from "@mui/material";
import ArtistItem from "./components/ArtistItem.tsx";
import { selectUser } from "../users/usersSlice.ts";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isLoading = useAppSelector(selectFetchLoading);
    const user = useAppSelector(selectUser);
    const userId = user?._id;

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const filteredArtists = artists.filter(artist =>
        artist.isPublished || (user?.role === 'admin') || (artist.userId === userId && !artist.isPublished)
    );

    return (
        <Grid container direction="column" gap={2}>
            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid item container gap={2}>
                    {filteredArtists.length > 0 ? (
                        filteredArtists.map(artist => (
                            <ArtistItem
                                key={artist._id}
                                id={artist._id}
                                name={artist.name}
                                info={artist.info}
                                image={artist.image}
                                userId={artist.userId}
                                isPublished={artist.isPublished}
                            />
                        ))
                    ) : (
                        <Grid item>
                            <p>No artists available.</p>
                        </Grid>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default Artists;