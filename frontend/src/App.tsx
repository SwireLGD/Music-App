import Artists from "./features/artists/Artists.tsx";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import {Container, Typography} from "@mui/material";
import Albums from "./features/albums/Albums.tsx";
import {Route, Routes} from "react-router-dom";
import Tracks from "./features/tracks/Tracks.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path='/' element={<Artists />} />
                        <Route path='/albums/:artistId' element={<Albums /> } />
                        <Route path='/tracks/:albumId' element={<Tracks />} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Typography variant="h2">Not Found</Typography>} />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;