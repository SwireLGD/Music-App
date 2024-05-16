import {  useState } from "react";
import { ArtistMutation } from "../../../types";
import { selectCreateLoading } from "../artistsSlice";
import {  useAppSelector } from "../../../app/hooks";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";

interface Props {
    onSubmit: (mutation: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
    const isCreating = useAppSelector(selectCreateLoading);
    const [state, setState] = useState<ArtistMutation>({
        name: '',
        info: '',
        image: null,
    });

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => {
            return {...prevState, [name]: value};
        }); 
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>

                <Grid item xs>
                <TextField
                    id="name" label="name"
                    value={state.name}
                    onChange={inputChangeHandler}
                    name="name"
                    required
                />
                </Grid>

                <Grid item xs>
                <TextField
                    id="info" label="info"
                    value={state.info}
                    onChange={inputChangeHandler}
                    name="info"
                />
                </Grid>

                <Grid item xs>
                <FileInput
                    onChange={fileInputChangeHandler}
                    name="image"
                    label="Image"
                />
                </Grid>

                <Grid item xs>
                    {isCreating ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" color="primary" variant="contained">Create</Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default ArtistForm;