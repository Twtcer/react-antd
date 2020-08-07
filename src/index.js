import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';

import { mainRoutes } from './routes';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/admin' render={routeProps => <App {...routeProps} />} />
        {
          mainRoutes.map(route => {

            return <Route key={route.path} {...route}></Route>
          })
        }
        <Redirect to='/404' />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
