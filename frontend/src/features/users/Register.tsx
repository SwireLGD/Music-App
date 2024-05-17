import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RegisterMutation } from '../../types';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './usersSlice.ts';
import { register, googleLogin } from './usersThunks.ts';
import { GoogleLogin } from '@react-oauth/google';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        email: '',
        displayName: '',
        password: '',
        avatar: null,
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
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

    const googleLoginHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            if (credentialResponse.credential) {
                                void googleLoginHandler(credentialResponse.credential);
                            }
                        }}
                        onError={() => {
                            console.log('Login error');
                        }}
                    />
                </Box>
                <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="E-mail"
                                name="email"
                                autoComplete="new-email"
                                value={state.email}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('email'))}
                                helperText={getFieldError('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nickname"
                                name="displayName"
                                autoComplete="displayName"
                                value={state.displayName}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('displayName'))}
                                helperText={getFieldError('displayName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={state.password}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FileInput
                                onChange={fileInputChangeHandler}
                                name="image"
                                label="Image"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
