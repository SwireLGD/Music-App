import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useEffect, useState } from "react";
import { TrackMutation } from "../../types";
import { createTrack } from "./tracksThunks";
import { Alert, Snackbar, Typography } from "@mui/material";
import TrackForm from "./components/TrackForm";

const NewTrack = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
        }
    }, [user?.token]);

    const onFormSubmit = async (trackMutation: TrackMutation) => {
        try {
            await dispatch(createTrack(trackMutation)).unwrap();
            setSnackbarMessage('Track created successfully!');
            setSnackbarOpen(true);
        } catch (e) {
            console.error(e);
            setSnackbarMessage('Failed to create the track.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Typography variant="h4">New track</Typography>
            <TrackForm onSubmit={onFormSubmit} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Track created successfully!' ? 'success' : 'error'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewTrack;