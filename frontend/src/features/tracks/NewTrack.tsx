import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useEffect } from "react";
import { TrackMutation } from "../../types";
import { createTrack } from "./tracksThunks";
import { Typography } from "@mui/material";
import TrackForm from "./components/TrackForm";

const NewTrack = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    
    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
        }
    }, [user?.token]);

    const onFormSubmit = async (trackMutation: TrackMutation) => {
        try {
            await dispatch(createTrack(trackMutation)).unwrap();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4">New track</Typography>
            <TrackForm onSubmit={onFormSubmit} />
        </>
    );
};

export default NewTrack;