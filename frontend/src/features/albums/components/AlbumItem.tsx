import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import {apiURL} from "../../../constants.ts";
import {CardMedia, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Artist} from "../../../types";

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
    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + image;
    }

    const formattedDate = new Date(issueDate * 1000).toLocaleDateString("en-US", {
        year: 'numeric', month: 'numeric', day: 'numeric'
    });

    return (
        <List component={Link} to={`/tracks/${_id}`} sx={{ width: '100%', bgcolor: 'background.paper', color: 'inherit', textDecoration: 'none' }} >
            <ListItem alignItems="flex-start">
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
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default AlbumItem;