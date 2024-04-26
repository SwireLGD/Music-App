import {useAppDispatch, useAppSelector,} from "../../app/hooks.ts";
import {selectAlbums, selectFetchLoading} from "./albumsSlice.ts";
import {useEffect} from "react";
import {fetchAlbums} from "./albumsThunks.ts";
import {CircularProgress, Grid, Typography} from "@mui/material";
import AlbumItem from "./components/AlbumItem.tsx";
import {useParams} from "react-router-dom";


const Albums = () => {
    const { artistId } = useParams();
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const artistName = albums.length > 0 ? albums[0].artist.name : "Artist";
    const isLoading = useAppSelector(selectFetchLoading);

    useEffect(() => {
        if  (artistId) {
            dispatch(fetchAlbums(artistId));
        }
    }, [artistId, dispatch]);

    return (
        <Grid container direction="column" gap={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">{artistName}</Typography>
                </Grid>
            </Grid>

            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid item container gap={2}>
                    {albums.map(album => (
                        <AlbumItem
                            key={album._id}
                            _id={album._id}
                            artist={album.artist}
                            title={album.title}
                            image={album.image}
                            issueDate={album.issueDate}
                        />
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default Albums;