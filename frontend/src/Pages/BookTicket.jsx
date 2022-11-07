import React, { useEffect } from 'react';
import { Button, Container, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import dateFormat from "dateformat";

const useStyles = makeStyles({
    field: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '20px',
        width: '27ch'
    }
})

const routes = [
    {
        value: 'KLA-NAI',
        label: 'Kampala to Nairobi',
        amount: 65000
    },
    {
        value: 'KLA-MOM',
        label: 'Kampala to Mombasa',
        amount: 120000
    },
    {
        value: 'KLA-GUL',
        label: 'Kampala to Gulu',
        amount: 30000
    },
    {
        value: 'KLA-KIG',
        label: 'Kampala to Kigali',
        amount: 50000
    },
];

function Ticket() {
    const classes = useStyles();
    const [route, setRoute] = React.useState('');
    const [routeError, setRouteError] = React.useState(false)
    const [date, setDate] = React.useState('');
    const [dateError, setDateError] = React.useState(false);
    const [quantity, setQuantity] = React.useState('');
    const [quantityError, setQuantityError] = React.useState(false);
    const [amount, setAmount] = React.useState('');

    var now = new Date();
    const minDate = dateFormat(now, "isoDateTime");

    let ticket = JSON.parse(localStorage.getItem('payload'));

    let history = useHistory();

    useEffect(() => {
        const getAmount = () => {
            var result = routes.map(function (a) { return a.value; });
            if (route) {
                let index = (result.indexOf(route))
                setAmount(routes[index].amount)
            } else {
                setAmount('');
            }
        }
        getAmount();
    })


    function handleSubmit(e) {
        e.preventDefault();
        
        const ticketPayload = {
            route: route,
            date: date.substring(0, 10),
            time: date.substring(11,),
            amount: amount * quantity
        }

        if (ticketPayload.route === '') {
            setRouteError(true);
        } else if (ticketPayload.date === '') {
            setDateError(true);
            setRouteError(false);
        } else if (quantity === '') {
            setQuantityError(true);
            setRouteError(false);
            setDateError(false);
        } else if (ticketPayload.route && ticketPayload.date && quantity) {
            setDateError(false);
            setQuantityError(false);
            setRouteError(false);

            localStorage.setItem('payload', JSON.stringify(ticketPayload));

            const token = localStorage.getItem('token');
            if (token) {
                history.push('/confirm-payment');
            } else {
                history.push('/auth/login');
            }
        }

    }

    return (
        <Container>
            <Typography>Before you book a comfortable ride, please note that our departure times are 5.30am, 6.30am, 9.00am, 3.00pm,
                6.00pm and 7.00pm. Thank you.
            </Typography>
            <br />
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    className={classes.field}
                    select
                    label="Route"
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select your route"
                    variant="outlined"
                    error={routeError}
                >
                    <option aria-label="None" value="" />
                    {routes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    id="datetime-local"
                    onChange={(e) => setDate(e.target.value)}
                    label="Pick a date and time"
                    type="datetime-local"
                    className={classes.field}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: minDate.substring(0,16)
                    }}
                    error={dateError}
                />
                <TextField
                    className={classes.field}
                    select
                    label="No. of tickets"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                    error={quantityError}
                >
                    <option aria-label="None" value="" />
                    <option> 1 </option>
                    <option> 2 </option>
                    <option> 3 </option>
                    <option> 4 </option>
                    <option> 5 </option>
                </TextField>
                <Typography>Amount: UGX {quantity * amount}</Typography>

                <Button type="submit" variant="contained" color="primary" className={classes.field}>Checkout</Button>
            </form>
            {ticket ? <Typography>Confirm previous <Link href='/confirm-payment' underline='none'>Ticket</Link></Typography>: null}
        </Container>
    )
}

export default Ticket;
