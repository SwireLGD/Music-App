import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtists} from "./artistsSlice.ts";
import {useEffect} from "react";
import {fetchArtists} from "./artistsThunks.ts";
import {Grid} from "@mui/material";
import ArtistItem from "./components/ArtistItem.tsx";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <Grid container direction="column" gap={2}>
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
        </Grid>
    );
};

export default Artists;