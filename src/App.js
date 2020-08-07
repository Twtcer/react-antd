import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import { adminRoutes } from './routes';
import Base from './components/base'

function App() {
  return (
    <Base>  
       <Switch>
       {
          adminRoutes.map(route => { 
            return <Route key={route.path} {...route} render={routeProps=>{
              return <route.component {...routeProps} />
            }}></Route>
          })
        }
        <Redirect to='/404' />
       </Switch>
    </Base>
  );
}

export default App;
