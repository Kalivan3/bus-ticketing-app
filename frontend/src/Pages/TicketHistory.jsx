import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Container, Grid, CircularProgress, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const TicketHistory = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');

    const user = jwt_decode(token);

    const id = user.id;
    const username = user.username;

    const url = `http://localhost:5000/${username}/${id}/tickets/all`

    useEffect(() => {
        const fetchTickets = async () => {
            setIsLoading(true);
            const response = await axios(url, { headers: { Authorization: `${token}` } });
            setTickets(response.data.tickets);
            setIsLoading(false);
        }
        fetchTickets();
    }, [url, token])

    return (
        <Container>
            {<h1>Booking History</h1>}
            <Grid container spacing = {3}>
                {isLoading ? (
                    <CircularProgress color="secondary"/>
                ) : tickets ? (tickets.map(ticket => (
                    <Grid key={ticket._id} item xs={12} md={6} lg={4}>
                        <Card variant="outlined" elevation = {1}>
                            <CardContent>
                                <CardHeader
                                    title="Le Coucher Coaches"
                                />
                                <Typography>
                                    id: {ticket._id}
                                </Typography>
                                <Typography>
                                    route: {ticket.route}
                                </Typography>
                                <Typography>
                                    date: {ticket.date.substring(0, 10)}
                                </Typography>
                                <Typography>
                                    time: {ticket.time}
                                </Typography>
                                <Typography>
                                    amount: {ticket.amount}
                                </Typography>
                                <Typography>
                                    Paid by: {username.toUpperCase()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                ) : <Typography>No tickets booked by user</Typography>}
            </Grid>
        </Container>
    )
}

export default TicketHistory;

