import {Button, Typography} from "@mui/material";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {selectUser} from "../../users/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {playTrack} from "../../trackHistory/trackHistoryThunks.ts";

interface Props {
    number: number;
    title: string;
    duration: string;
    trackId: string;
}

const TrackItem: React.FC<Props> = ({ number, title, duration, trackId}) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const handlePlay = () => {
        if (user?.token) {
            dispatch(playTrack({ trackId, token: user.token }));
        }
    };

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem secondaryAction={
                user ? <Button variant="outlined" onClick={handlePlay}>Play</Button> : null
            }>
                <ListItemText primary={
                    <Typography variant="h6" component="div">
                        {number}. {title}
                    </Typography>
                } secondary={
                    <Typography variant="body2" color="text.secondary">
                        Duration: {duration}
                    </Typography>
                } />
            </ListItem>
        </List>
    );
};

export default TrackItem;