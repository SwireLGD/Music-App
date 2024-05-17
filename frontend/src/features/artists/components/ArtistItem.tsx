import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import {apiURL} from "../../../constants.ts";
import {Button, CardMedia, CircularProgress, IconButton, styled} from "@mui/material";
import {Link} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectDeleting, selectPublishing } from '../artistsSlice.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { deleteArtist, togglePublished } from '../artistsThunks.ts';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    id: string;
    name: string;
    info: string;
    image: string | null;
    isPublished: boolean;
    userId: string;
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%' 
});

const ArtistItem: React.FC<Props> = ({id, name, image, info, userId, isPublished}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const publishing = useAppSelector(selectPublishing);
    const deleting = useAppSelector(selectDeleting);

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/public/' + image;
    }

    const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(deleteArtist(id));
    };

    const handleTogglePublished = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(togglePublished(id));
    };

    const canDelete = user?.role === 'admin' || (user?._id === userId && !isPublished);
    const canTogglePublish = user?.role === 'admin';



    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', color: 'inherit', textDecoration: 'none' }} >
            <ListItem alignItems="flex-start" component={Link} to={`/albums/${id}`} 
                sx={{ color: 'black', textDecoration: 'none', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                <ListItemAvatar sx={{ marginRight: '10px' }}>
                    <ImageCardMedia image={cardImage}/>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={info}
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

export default ArtistItem;