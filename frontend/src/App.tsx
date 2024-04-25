import Artists from "./features/artists/Artists.tsx";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import {Container} from "@mui/material";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <main>
                <Container maxWidth="xl">
                    <Artists />
                </Container>

            </main>
        </>
    );
};

export default App;