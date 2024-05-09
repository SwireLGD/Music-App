import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface Props {
    artist: string;
    track: string;
    date: string;
}

const TrackHistoryItem: React.FC<Props> = ({ artist, track, date }) => {

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>  
            <ListItem divider>
                <ListItemText primary={
                    <Typography variant="h6">
                        {track} - {artist}
                    </Typography>
                } secondary={
                    <Typography variant="body2" color="text.secondary">
                        Played at: {date}
                    </Typography>
                } />
            </ListItem>
        </List>
    );
};

export default TrackHistoryItem;