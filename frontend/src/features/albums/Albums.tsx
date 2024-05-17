import {useAppDispatch, useAppSelector,} from "../../app/hooks.ts";
import {selectAlbums, selectFetchLoading} from "./albumsSlice.ts";
import {useEffect} from "react";
import {fetchAlbums} from "./albumsThunks.ts";
import {CircularProgress, Grid, Typography} from "@mui/material";
import AlbumItem from "./components/AlbumItem.tsx";
import {useParams} from "react-router-dom";
import { selectUser } from "../users/usersSlice.ts";


const Albums = () => {
    const { artistId } = useParams();
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const artistName = albums.length > 0 ? albums[0].artist.name : "Artist";
    const isLoading = useAppSelector(selectFetchLoading);
    const user = useAppSelector(selectUser);
    const userId = user?._id;

    useEffect(() => {
        if  (artistId) {
            dispatch(fetchAlbums(artistId));
        }
    }, [artistId, dispatch]);

    const filteredAlbums = albums.filter(album =>
        album.isPublished || (user && (user.role === 'admin' || album.userId === userId))
    );

    return (
        <Grid container direction="column" gap={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{artistName}</Typography>
            </Grid>
            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : filteredAlbums.length > 0 ? (
                <Grid item container gap={2}>
                    {filteredAlbums.map(album => (
                        <AlbumItem
                            key={album._id}
                            _id={album._id}
                            title={album.title}
                            artist={album.artist}
                            image={album.image}
                            issueDate={album.issueDate}
                            userId={album.userId}
                            isPublished={album.isPublished}
                        />
                    ))}
                </Grid>
            ) : (
                <Grid item>
                    <Typography>No albums available.</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default Albums;