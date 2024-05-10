import {Button, IconButton, Typography} from "@mui/material";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {selectUser} from "../../users/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {playTrack} from "../../trackHistory/trackHistoryThunks.ts";
import { selectDeleting, selectPublishing } from "../tracksSlice.ts";
import { useNavigate } from "react-router-dom";
import { deleteTrack, togglePublished } from "../tracksThunks.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';

interface Props {
    id: string;
    number: number;
    title: string;
    duration: string;
    trackId: string;
}

const TrackItem: React.FC<Props> = ({id, number, title, duration, trackId}) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const publishing = useAppSelector(selectPublishing);
    const deleting = useAppSelector(selectDeleting);
    const navigate = useNavigate();

    const handlePlay = () => {
        if (user?.token) {
            dispatch(playTrack({ trackId, token: user.token }));
        }
    };

    const handleDelete = () => {
        dispatch(deleteTrack(id));
        navigate('/');
    };

    const handleTogglePublished = () => {
        dispatch(togglePublished(id));
        navigate('/');
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
            {user && user.role === 'admin' && (
                <>
                    <IconButton onClick={handleTogglePublished} disabled={publishing} color="primary">
                        <PublishIcon />
                            </IconButton>
                        <IconButton onClick={handleDelete} disabled={deleting} color="error">
                            <DeleteIcon />
                        </IconButton>
                </>
            )}
        </List>
    );
};

export default TrackItem;