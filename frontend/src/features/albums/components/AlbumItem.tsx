import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import {apiURL} from "../../../constants.ts";
import {CardMedia, IconButton, styled, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {Artist} from "../../../types";
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { deleteAlbum, togglePublished } from '../albumsThunks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { selectDeleting, selectPublishing } from '../albumsSlice.ts';

interface Props {
    _id: string;
    artist: Artist;
    title: string;
    issueDate: number;
    image: string | null;
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
        paddingTop: '100%'
});

const AlbumItem: React.FC<Props> = ({_id, title, image, issueDate}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const publishing = useAppSelector(selectPublishing);
    const deleting = useAppSelector(selectDeleting);
    const navigate = useNavigate();

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/public/' + image;
    }

    const formattedDate = new Date(issueDate * 1000).toLocaleDateString("en-US", {
        year: 'numeric', month: 'numeric', day: 'numeric'
    });

    const handleDelete = () => {
        dispatch(deleteAlbum(_id));
        navigate('/');
    };

    const handleTogglePublished = () => {
        dispatch(togglePublished(_id));
        navigate('/');
    };

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
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default AlbumItem;