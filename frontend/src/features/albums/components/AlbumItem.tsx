import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import {apiURL} from "../../../constants.ts";
import {Button, CardMedia, CircularProgress, IconButton, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Artist} from "../../../types";
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { deleteAlbum, togglePublished } from '../albumsThunks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectDeleting, selectPublishing } from '../albumsSlice.ts';

interface Props {
    _id: string;
    artist: Artist;
    title: string;
    issueDate: number;
    image: string | null;
    isPublished: boolean;
    userId: string;
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
        paddingTop: '100%'
});

const AlbumItem: React.FC<Props> = ({_id, title, image, issueDate, userId, isPublished}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const publishing = useAppSelector(selectPublishing);
    const deleting = useAppSelector(selectDeleting);

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/public/' + image;
    }

    const formattedDate = new Date(issueDate * 1000).toLocaleDateString("en-US", {
        year: 'numeric', month: 'numeric', day: 'numeric'
    });

    const handleDelete = () => {
        dispatch(deleteAlbum(_id));
    };

    const handleTogglePublished = () => {
        dispatch(togglePublished(_id));
    };

    const canDelete = user?.role === 'admin' || (user?._id === userId && !isPublished);
    const canTogglePublish = user?.role === 'admin';

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', color: 'inherit', textDecoration: 'none' }} >
            <ListItem alignItems="flex-start" component={Link} to={`/tracks/${_id}`}
            sx={{ color: 'black', textDecoration: 'none', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                <ListItemAvatar sx={{ marginRight: '10px' }}>
                    <ImageCardMedia image={cardImage}/>
                </ListItemAvatar>
                <ListItemText
                    primary={title}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {formattedDate}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            {canDelete && (
                <IconButton onClick={handleDelete} disabled={deleting} color="error">
                    {deleting ? <CircularProgress size={24} /> : <DeleteIcon />}
                </IconButton>
            )}
            {canTogglePublish && (
                <Button onClick={handleTogglePublished} disabled={publishing} color="primary" variant="outlined">
                    {publishing ? <CircularProgress size={24} /> : (isPublished ? "Unpublish" : "Publish")}
                </Button>
            )}
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default AlbumItem;