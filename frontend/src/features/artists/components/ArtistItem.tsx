import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import {apiURL} from "../../../constants.ts";
import {CardMedia, styled} from "@mui/material";
import {Link} from "react-router-dom";

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
    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/public/' + image;
    }

    return (
        <List component={Link} to={`/albums/${id}`} sx={{ width: '100%', bgcolor: 'background.paper', color: 'inherit', textDecoration: 'none' }} >
            <ListItem alignItems="flex-start">
                <ListItemAvatar sx={{ marginRight: '10px' }}>
                    <ImageCardMedia image={cardImage}/>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={info}
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default ArtistItem;