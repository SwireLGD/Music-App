import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {CardMedia, Grid, styled, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {selectTracks} from "./tracksSlice.ts";
import {fetchTracks} from "./tracksThunks.ts";
import TrackItem from "./components/TrackItem.tsx";
import imageNotAvailable from "../../../assets/imageNotAvailable.png";
import {apiURL} from "../../constants.ts";


const Albums = () => {
    const {albumId} = useParams();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const AlbumName = tracks.length > 0 ? tracks[0].album.title : "Album";

    useEffect(() => {
        if (albumId) {
            dispatch(fetchTracks(albumId));
        }
    }, [albumId, dispatch]);

    const ImageCardMedia = styled(CardMedia)({
        height: 0,
        paddingTop: '56.25%'
    });

    let cardImage = imageNotAvailable;

    if (tracks[0].album.image) {
        cardImage = apiURL + '/' + tracks[0].album.image;
    }

    return (
        <Grid container direction="column" gap={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">{tracks[0].album.artist.name}</Typography>
                    <ImageCardMedia
                        image={cardImage}
                    />
                    <Typography variant="h4">{AlbumName}</Typography>
                </Grid>
            </Grid>

            <Grid item container gap={2}>
                {tracks.map(track => (
                    <TrackItem
                        key={track._id}
                        number={track.number}
                        album={track.album}
                        title={track.title}
                        duration={track.duration}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default Albums;