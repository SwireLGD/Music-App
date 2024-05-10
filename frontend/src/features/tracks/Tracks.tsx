import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {CardMedia, CircularProgress, Grid, styled, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {selectFetchLoading, selectTracks} from "./tracksSlice.ts";
import {fetchTracks} from "./tracksThunks.ts";
import TrackItem from "./components/TrackItem.tsx";
import imageNotAvailable from "../../../assets/imageNotAvailable.png";
import {apiURL} from "../../constants.ts";
import { selectUser } from "../users/usersSlice.ts";

const Tracks = () => {
    const {albumId} = useParams();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isLoading = useAppSelector(selectFetchLoading);
    const user = useAppSelector(selectUser); 
    const navigate = useNavigate();
    const userId = user?._id;

    useEffect(() => {
        if (!user) {
            navigate('/login'); 
        }
    }, [user, navigate]);

    useEffect(() => {
        if (albumId && user) {
            dispatch(fetchTracks(albumId));
        } 
    }, [albumId, dispatch]);

    const ImageCardMedia = styled(CardMedia)({
        height: 0,
        paddingTop: '100%'
    });

    let cardImage = imageNotAvailable;
    let artistName = "Artist";
    let albumName = "Album";

    if (tracks.length > 0 && tracks[0].album) {
        artistName = tracks[0].album.artist.name;
        albumName = tracks[0].album.title;
        if (tracks[0].album.image) {
            cardImage = apiURL + '/public/' + tracks[0].album.image;
        }
    }

    const filteredTracks = tracks.filter(track =>
        track.isPublished || (user?.role === 'admin') || (track.userId === userId && !track.isPublished)
    );

    return (
        <Grid container direction="column" gap={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">{artistName}</Typography>
                    <ImageCardMedia image={cardImage} />
                    <Typography variant="h5">{albumName}</Typography>
                </Grid>
            </Grid>

            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : filteredTracks.length > 0 ? (
                <Grid item container gap={2}>
                    {filteredTracks.map(track => (
                        <TrackItem
                            key={track._id}
                            id={track._id}
                            trackId={track._id}
                            number={track.number}
                            title={track.title}
                            duration={track.duration}
                            isPublished={track.isPublished}
                            userId={track.userId}
                        />
                    ))}
                </Grid>
            ) : (
                <Grid item>
                    <Typography>No tracks available.</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default Tracks;