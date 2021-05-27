import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from '../Components/Views/HomeView';
import UserForm from '../Components/Forms/UserForm';

export default function Routes() {
  return (
      <Switch>
        <Route exact path='/' component={() => <Home/>} />
        <Route exact path='/userForm' component={() => <UserForm/>} />
        <Route exact path='/session/:id' component={() => <Home/>} />
      </Switch>
  );
}

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user}/>)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)}/>;
};
