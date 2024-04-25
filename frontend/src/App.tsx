import Artists from "./features/artists/Artists.tsx";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import {Container} from "@mui/material";
import Albums from "./features/albums/Albums.tsx";
import {Route, Routes} from "react-router-dom";

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
                    </Routes>
                </Container>

            </main>
        </>
    );
};

export default App;