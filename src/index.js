import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
import store from './store/index';

import { mainRoutes } from './routes';
import { Provider } from 'react-redux';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/admin' render={routeProps => <App {...routeProps} />} />
        {
          mainRoutes.map(route => {

            return <Route key={route.path} {...route}></Route>
          })
        }
        <Redirect to='/admin' from='/' exact />
        <Redirect to='/404' />
      </Switch>
    </Router>
    </Provider>
    ,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
