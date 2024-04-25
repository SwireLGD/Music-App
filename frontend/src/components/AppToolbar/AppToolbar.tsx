import {Link as NavLink} from "react-router-dom";
import {AppBar, Grid, styled, Toolbar, Typography} from "@mui/material";

const LogoLink = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div">
                        <LogoLink to="/">Music App</LogoLink>
                    </Typography>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;