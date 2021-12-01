import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaUserCircle } from 'react-icons/fa';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import IconButton from '@mui/material/IconButton';
import Cookies from 'universal-cookie'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom'

export default function PositionedMenu() {
    const cookies = new Cookies()
    const plant = cookies.get("plant")
    const user = cookies.get("user")
    const role = cookies.get("role")
    const [auth, setAuth] = React.useState((cookies.get("user")))
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [opens, setOpens] = React.useState(false);
    // const handleClose = () => {
    //   setOpen(false);
    // };
    const handleToggle = () => {
        setOpens(!opens);
    };

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
                style={{ marginLeft: "2rem", }}
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
                {/* <MenuItem onClick={handleClose} >{auth}</MenuItem> */}
                <MenuItem>
                    <Stack direction="row" spacing={1}>
                        <Chip style={{ textTransform: "uppercase", fontWeight: "bolder", padding: "0 2rem 0 0" }} icon={<FaceIcon />} label={auth} variant="outlined" />
                    </Stack>
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem>
                    {["PLANT HEAD", "ADMIN"].includes(role) && <Link style={{ textDecoration: "none" }} to={`/user/permission`}>
                        User Permission
                    </Link>}
                </MenuItem>
                <MenuItem onClick={e => {
                    cookies.remove("user", { path: "/" })
                    cookies.remove("plant", { path: "/" })
                    cookies.remove("role", { path: "/" })
                    console.log(cookies.remove("user"));
                    handleToggle()
                    handleClose()
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 1500)
                }}>Logout</MenuItem>
            </Menu>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={opens}
                onClick={() => {
                    setOpens(true);
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}