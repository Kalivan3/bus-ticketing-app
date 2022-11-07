import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory, useLocation } from 'react-router';
import { IconButton, Menu, MenuItem, Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    active: {
        background: '#f4f4f4'
    },
    title: {
        flexGrow: 1
    },
    footer: {
        flexDirection: 'column'
    }
}));


function Layout({ children }) {
    const classes = useStyles();
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);


    useEffect(() => {
        const getToken = () => {
            setToken(localStorage.getItem('token'));
            if (token) {
                const user = jwt_decode(token);
                setUsername(user.username);
            } else {
                setUsername('');
            }
        }
        getToken();
    })


    let history = useHistory();
    let location = useLocation();

    if (location.pathname.match('/auth/login')) {
        return <div>{children}</div>;
    } else if (location.pathname.match('/auth/signup')) {
        return <div>{children}</div>;
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }

    const menuItems = [
        {
            text: 'Home',
            path: '/'
        },
        {
            text: 'Book A Ticket',
            path: '/book-a-ticket'
        },
        {
            text: 'About',
            path: '/about'
        }
    ]

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.title} variant="h5" noWrap>
                        Le Coucher Coaches
                    </Typography>
                    {token ? (
                        <>
                            <Typography> {username.toUpperCase()} </Typography>
                            <IconButton
                                size="medium"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Button onClick={handleLogout} color="primary">Logout</Button>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (<>
                        <Button color='inherit' href="/auth/signup">Signup</Button>
                        <Button color='inherit' href="/auth/login">Login</Button>
                    </>)}

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem button key={item.text} onClick={() => history.push(item.path)}
                                className={location.pathname === item.path ? classes.active : null}>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                        {token ? (<ListItem button onClick={() => history.push('/my-tickets')}
                            className={location.pathname === '/my-tickets' ? classes.active : null}>
                            <ListItemText primary={'Booking History'} />
                        </ListItem>) : null}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                <div>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout;
