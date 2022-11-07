import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import BookTicket from './Pages/BookTicket';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import TicketHistory from './Pages/TicketHistory';
import Checkout from './Pages/Checkout';
import ProtectedRoute from './Components/ProtectedRoute';
import jwtDecode from "jwt-decode";


function App() {
  const [expToken, setExpToken] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      let token = localStorage.getItem('token');
      if (token) {
        let { exp } = jwtDecode(token)
        if (Date.now() >= exp * 1000) {
          setExpToken(true);
          localStorage.removeItem('token');
        }
      }
      else {
        setExpToken(false);
      }
    }
    checkToken();
  })

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path='/'> <Home /> </Route>
          <Route path='/about'> <About /> </Route>
          <Route path='/book-a-ticket'> <BookTicket /> </Route>
          <Route path='/auth/login'> <Login expToken={expToken} /> </Route>
          <Route path='/auth/signup'> <Signup /> </Route>
          <ProtectedRoute path='/my-tickets' component={TicketHistory} />
          <Route path='/confirm-payment'> <Checkout /> </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
