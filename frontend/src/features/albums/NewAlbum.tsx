import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AlbumMutation } from "../../types";
import { createAlbum } from "./albumsThunks";
import { Typography } from "@mui/material";
import AlbumForm from "./components/AlbumForm";
import { useEffect } from "react";
import { selectUser } from "../users/usersSlice";

const NewAlbum = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    
    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
        }
    }, [user?.token]);

    const onFormSubmit = async (albumMutation: AlbumMutation) => {
        try {
            await dispatch(createAlbum(albumMutation)).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
        <Typography variant="h4">New album</Typography>
        <AlbumForm onSubmit={onFormSubmit} />
        </>
    );
};

export default NewAlbum;