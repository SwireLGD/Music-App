import {Typography} from "@mui/material";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

interface Props {
    number: number;
    title: string;
    duration: string;
    trackId: string;
    onTrackPlay: (trackId: string) => void;
}

const TrackItem: React.FC<Props> = ({ number, title, duration, trackId, onTrackPlay}) => {

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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