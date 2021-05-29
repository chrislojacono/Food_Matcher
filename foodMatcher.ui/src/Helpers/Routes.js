import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from '../Components/Views/HomeView';
import UserForm from '../Components/Forms/UserForm';
import SessionView from '../Components/Views/SessionView';
import ToAuthOrNot from '../Components/Views/ToAuthOrNot';

export default function Routes({ user }) {
  return (
      <Switch>
        <Route exact path='/' component={() => <ToAuthOrNot user={user}/>} />
        <Route exact path='/userForm' component={() => <UserForm user={user}/>} />
        <Route exact path='/session/:id' component={(props) => <SessionView {...props} user={user}/>} />
      </Switch>
  );
}
