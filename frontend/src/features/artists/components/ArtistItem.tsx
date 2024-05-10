import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import {apiURL} from "../../../constants.ts";
import {CardMedia, IconButton, styled} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectDeleting, selectPublishing } from '../artistsSlice.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { deleteArtist, togglePublished } from '../artistsThunks.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';

interface Props {
    id: string;
    name: string;
    info: string;
    image: string | null;
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%' 
});

const ArtistItem: React.FC<Props> = ({id, name, image, info}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const publishing = useAppSelector(selectPublishing);
    const deleting = useAppSelector(selectDeleting);
    const navigate = useNavigate();

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/public/' + image;
    }

    const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(deleteArtist(id));
        navigate('/');
    };

    const handleTogglePublished = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(togglePublished(id));
        navigate('/');
    };

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

export default ArtistItem;