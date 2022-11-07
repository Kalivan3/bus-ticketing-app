import { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import { Button, Container, makeStyles, Link } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles({
    root:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
        width: "100%",
    },
    header:{
        textAlign: 'center'
    },
    field: {
        marginTop: '20px',
        marginBottom: '20px',
        width: '250px'
    }
})

function Signup() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [userError, setUserError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    let history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            username: username,
            email: email,
            password: password
        }

        axios.post('http://localhost:5000/auth/signup', payload)
            .then(res => {
                if (res.data.message === 'user created successfully') {
                    history.push('/auth/login');
                }
            }).catch((error) => {
                if (error.response.data.errors) {
                    setUserError(error.response.data.errors.username);
                    setEmailError(error.response.data.errors.email);
                    setPasswordError('');
                }
                else if (error.response.data.message) {
                    setUserError('');
                    setEmailError('');
                    setPasswordError(error.response.data.message);
                }
            });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Container>
            <h1 className= {classes.header}><Link underline ='none' href='/' color ='inherit'>Le Coucher Coaches</Link></h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.root}>
                <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    className={classes.field}
                    label="username"
                    value={username}
                    variant="outlined"
                    required
                    placeholder="Minimum of 5 characters"
                    error={userError}
                    helperText={userError}
                />
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.field}
                    label="email"
                    value={email}
                    variant="outlined"
                    required
                    error={emailError}
                    helperText={emailError}
                />
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.field}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    label="password"
                    variant="outlined"
                    required
                    placeholder="Minimum of 8 characters"
                    error={passwordError}
                    helperText={passwordError}
                    InputProps={{
                        endAdornment: (
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
                        )
                    }}
                />
                <Button type="submit" variant="contained" color="primary">Signup</Button>
                <p>Have an account? <Link href='/auth/login'>Login</Link></p>
            </form>
        </Container>
    )
}

export default Signup;
