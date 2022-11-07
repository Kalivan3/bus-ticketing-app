import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('token');
    return (
        <Route 
            {...rest}
            render = {props => {
                if(token !== null){
                   return <Component {...props}/>
                } else {
                    return <Redirect to={
                        {
                          pathname: '/auth/login',
                          state: {
                            from: props.location
                          }
                        }
                      } />
                }
            } }
        />
    )
}

export default ProtectedRoute;