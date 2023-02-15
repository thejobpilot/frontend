import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";

export default function NavBar() {
    return (<AppBar position="fixed">
        <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
                JopPilot
            </Typography>
        </Toolbar>
    </AppBar>)
}