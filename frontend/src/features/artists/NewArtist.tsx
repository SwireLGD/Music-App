import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useEffect, useState } from "react";
import { ArtistMutation } from "../../types";
import { createArtist } from "./artistsThunks";
import { Alert, Snackbar, Typography } from "@mui/material";
import ArtistForm from "./components/ArtistForm";

const NewArtist = () => {
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

    const onFormSubmit = async (artistMutation: ArtistMutation) => {
        try {
            await dispatch(createArtist(artistMutation)).unwrap();
            setSnackbarMessage('Artist created successfully!');
            setSnackbarOpen(true);
        } catch (e) {
            console.error(e);
            setSnackbarMessage('Failed to create the artist.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Typography variant="h4">New artist</Typography>
            <ArtistForm onSubmit={onFormSubmit} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Artist created successfully!' ? 'success' : 'error'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewArtist;