import {selectUser} from "../users/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTrackHistory, selectTrackHistoryLoading} from "./trackHistorySlice.ts";
import {useEffect} from "react";
import {fetchTrackHistory} from "./trackHistoryThunks.ts";
import {CircularProgress, Typography} from "@mui/material";
import List from "@mui/material/List";
import TrackHistoryItem from "./components/TrackHistoryItem.tsx";
import { useNavigate } from "react-router-dom";


const TrackHistoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const trackHistory = useAppSelector(selectTrackHistory);
    const loading = useAppSelector(selectTrackHistoryLoading);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.token) {
            dispatch(fetchTrackHistory(user.token));
        } else {
            navigate('/login');
        }
    }, [dispatch, user?.token]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {trackHistory.length > 0 ? trackHistory.map(item => (
                <TrackHistoryItem 
                key={item._id}
                artist={item.artist?.name}
                track={item.track?.title}
                date={new Date(item.playedAt).toLocaleString()}
                />
            )) : <Typography variant="subtitle1" sx={{ m: 2 }}>No track history available.</Typography>}
        </List>
    );
};

export default TrackHistoryList;