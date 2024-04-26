import {Album} from "../../../types";
import {Typography} from "@mui/material";
import * as React from "react";
import {Link} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

interface Props {
    album: Album;
    number: number;
    title: string;
    duration: string;
}

const TrackItem: React.FC<Props> = ({album, number, title, duration}) => {

    return (
        <List component={Link} to={`/tracks/${album._id}`} sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem>
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