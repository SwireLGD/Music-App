import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useEffect } from "react";
import { ArtistMutation } from "../../types";
import { createArtist } from "./artistsThunks";
import { Typography } from "@mui/material";
import ArtistForm from "./components/ArtistForm";

const NewArtist = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    
    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
        }
    }, [user?.token]);

    const onFormSubmit = async (artistMutation: ArtistMutation) => {
        try {
            await dispatch(createArtist(artistMutation)).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
        <Typography variant="h4">New artist</Typography>
        <ArtistForm onSubmit={onFormSubmit} />
        </>
    );
};

export default NewArtist;