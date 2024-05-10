import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from "../../../types";
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunks';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handelLogout = () => {
        dispatch(logout());
    }

    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user.username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/new-album">Add album</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/track_history">Track History</MenuItem>
                <MenuItem onClick={handelLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
