import React, { useState } from 'react';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import jwtDecode from "jwt-decode";
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: "300px",
    marginBottom: '20px'
  }
})


function Checkout() {
  const classes = useStyles();
  const [name, setName] = useState('');

  let ticket = JSON.parse(localStorage.getItem('payload'));

  const token = localStorage.getItem('token');

  const user = jwtDecode(token);

  const id = user.id;
  const username = user.username;

  const url = `http://localhost:5000/${username}/${id}/book-ticket`

  function handleClick(e) {
    e.preventDefault();

    axios.post(url, ticket, { headers: { Authorization: `${token}` } })
      .then(res => {
        if(res.statusText === "OK"){
          localStorage.removeItem('payload');
        } 
      }).catch((error) => {
        console.log(error);
      })
    }


return (
  <Container>
    <Card variant="outlined" elevation={1} className={classes.root}>
      <CardContent>
        <CardHeader
          title="Le Coucher Coaches"
        />
        <Typography>
          route: {ticket.route}
        </Typography>
        <Typography>
          date: {ticket.date}
        </Typography>
        <Typography>
          time: {ticket.time}
        </Typography>
        <Typography>
          amount: {ticket.amount}
        </Typography>
      </CardContent>
    </Card>
    <Button type="submit" onClick={handleClick} variant="contained" color="primary">Pay</Button>
  </Container>
)
}

export default Checkout;
