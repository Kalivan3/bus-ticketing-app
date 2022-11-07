import { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles, FormControl, TextField, Button, FormHelperText, Link } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        position: "relative",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    header:{
        textAlign: 'center',
    },
    textField: {
        width: '25ch',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    helperText: {
        color: theme.palette.error.main
    }
}));

function Login({expToken}) {
    const classes = useStyles();
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        const getToken = () => {
            setToken(localStorage.getItem('token'));
            if (token) {
                history.push('/');
            }
        }
        getToken();
    })

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        }

        if (payload.email === '' && payload.password === '') {
            setEmailError('This field cannot be empty');
            setPasswordError('This field cannot be empty');

        } else if (payload.email && payload.password === '') {
            setEmailError('');
            setPasswordError('This field cannot be empty');

        } else if (payload.email === '' && payload.password) {
            setPasswordError('')
            setEmailError('This field cannot be empty');

        } else if (payload.email && payload.password) {
            axios.post('http://localhost:5000/auth/login', payload)
                .then(res => {
                    if (res.data.message === 'Login successful') {
                        localStorage.setItem('token', res.data.token);
                        history.replace(from);
                    }
                }).catch((error) => {
                    if (error.response.data.error === "that email is not registered") {
                        setEmailError('User not registered');
                    } else if (error.response.data.error === "that password is incorrect") {
                        setEmailError('');
                        setPasswordError('Incorrect password');
                    }
                });
        }
    }

    return (
        <div>
            <h1 className={classes.header}><Link underline ='none' href='/' color ='inherit'>Le Coucher Coaches</Link></h1>
            {expToken ? <p>Session expired. Login to continue</p> : null}
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className = {clsx(classes.root)}>
                <TextField
                    className={clsx(classes.textField)}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    value={email}
                    variant="outlined"
                    error={emailError === 'User not registered'}
                    helperText={emailError}
                    required
                    FormHelperTextProps={{
                        className: classes.helperText
                    }}
                />
                <FormControl className={clsx(classes.textField)} variant="outlined" required
                    error={passwordError === 'Incorrect password'}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error>{passwordError}</FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <p>Don't have an account? <Link href='/auth/signup'>Signup</Link></p>
            </form>
        </div>
    )
}

export default Login;
