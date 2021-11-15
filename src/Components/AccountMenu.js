import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaUserCircle } from 'react-icons/fa';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Cookies from 'universal-cookie'
export default function PositionedMenu() {
    const cookies = new Cookies()
    const [auth, setAuth] = React.useState((cookies.get("user")))
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton style={{
                padding: "0.5rem",
                margin: "1rem"
            }} >
                <FaUserCircle id="demo-positioned-button"
                    aria-controls="demo-positioned-menu"
                    aria-haspopup="true"
                    // size="24"
                    style={{ cursor: "pointer" }}
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick} />
            </IconButton>
            <Menu
                style={{ marginLeft: "2rem" }}
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose} style={{ textTransform: "uppercase", fontWeight: "bolder" }}>{auth}</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={e => {
                    const cookies = new Cookies()
                    cookies.remove("user", { path: "/acc" })
                    console.log(cookies.remove("user"));
                    window.location.href = "/login"
                }}>Logout</MenuItem>
            </Menu>
        </div>
    );
}