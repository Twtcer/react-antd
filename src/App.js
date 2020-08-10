import React from 'react'; 
import './App.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import { adminRoutes } from './routes';
import MasterPage from './components/base'

function App() {
  return (
    <MasterPage>  
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
    </MasterPage>
  );
}

export default App;
