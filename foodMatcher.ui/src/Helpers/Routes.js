import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import SessionForm from '../Components/Forms/SessionForm';
import SessionView from '../Components/Views/SessionView';
import ToAuthOrNot from '../Components/Views/ToAuthOrNot';

export default function Routes({ user }) {
  return (
      <Switch>
        <Route exact path='/' component={() => <ToAuthOrNot user={user}/>} />
        <Route exact path='/SessionForm' component={() => <SessionForm user={user}/>} />
        <Route exact path='/session/:id' component={(props) => <SessionView {...props} user={user}/>} />
      </Switch>
  );
}
