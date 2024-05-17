import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AlbumMutation } from "../../types";
import { createAlbum } from "./albumsThunks";
import { Alert, Snackbar, Typography } from "@mui/material";
import AlbumForm from "./components/AlbumForm";
import { useEffect, useState } from "react";
import { selectUser } from "../users/usersSlice";

const NewAlbum = () => {
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

    const onFormSubmit = async (albumMutation: AlbumMutation) => {
        try {
            await dispatch(createAlbum(albumMutation)).unwrap();
            setSnackbarMessage('Album created successfully!');
            setSnackbarOpen(true);
        } catch (e) {
            console.error(e);
            setSnackbarMessage('Failed to create the album.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Typography variant="h4">New album</Typography>
            <AlbumForm onSubmit={onFormSubmit} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Album created successfully!' ? 'success' : 'error'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewAlbum;