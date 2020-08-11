import React ,{ Component } from 'react';
import './App.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import { adminRoutes } from './routes';
import MasterPage from './components/base';
import { isLogined } from './utils/auth';

export default class App extends Component { 
  
  componentWillMount(){
    if(isLogined()){ 
      this.props.history.push('/admin/dashboard');
    }
  }

  render() {
    return isLogined() ? (
      <MasterPage>
        <Switch>
          {
            adminRoutes.map(route => {
              return <Route
                key={route.path}
                {...route}
                render={routeProps => {
                  return <route.component {...routeProps} />
                }}></Route>
            })
          }
          <Redirect to={adminRoutes[0].path} from="/admin" />
          <Redirect to='/404' />
        </Switch>
      </MasterPage>
    ) : (<Redirect to="/Login" />);
  } 
}