import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {Provider} from "react-redux";
import {persistor, store} from "./app/store.ts";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import {PersistGate} from "redux-persist/integration/react";
import { addInterceptors } from './axiosApi.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants.ts';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </GoogleOAuthProvider>
    </Provider>
);