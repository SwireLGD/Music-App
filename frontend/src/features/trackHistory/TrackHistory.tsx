import {selectUser} from "../users/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTrackHistory, selectTrackHistoryLoading} from "./trackHistorySlice.ts";
import {useEffect} from "react";
import {fetchTrackHistory} from "./trackHistoryThunks.ts";
import {CircularProgress, Typography} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const TrackHistoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const trackHistory = useAppSelector(selectTrackHistory);
    const loading = useAppSelector(selectTrackHistoryLoading);
    const user = useAppSelector(selectUser); // Предположим, что есть slice user с данными пользователя

    useEffect(() => {
        if (user?.token) {
            dispatch(fetchTrackHistory(user.token));
        }
    }, [dispatch, user?.token]);

    if (loading) {
        return <CircularProgress />;
    }


    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {trackHistory.length > 0 ? trackHistory.map((item, index) => (
                <ListItem key={index} divider>
                    <ListItemText primary={
                        <Typography variant="h6">
                            {item.title.title} - {item.artist.name}
                        </Typography>
                    } secondary={
                        <Typography variant="body2" color="text.secondary">
                            Played at: {new Date(item.datetime).toLocaleString()}
                        </Typography>
                    } />
                </ListItem>
            )) : <Typography variant="subtitle1" sx={{ m: 2 }}>No track history available.</Typography>}
        </List>
    );
};

export default TrackHistoryList;