import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SessionForm from '../Components/Forms/SessionForm';
import SessionView from '../Components/Views/ActiveSessionView';
import ToAuthOrNot from '../Components/Views/ToAuthOrNot';
import YourSessions from '../Components/Views/YourSessions';
import SessionMatchesView from '../Components/Views/SessionBreakdown';
import JoinerAuth from '../Components/Views/JoinerAuth';

export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path='/' component={() => <ToAuthOrNot user={user} />} />
      <Route
        exact
        path='/SessionForm'
        component={() => <SessionForm user={user} />}
      />
      <Route
        exact
        path='/session/:id'
        component={(props) => <SessionView {...props} user={user} />}
      />
      <Route
        exact
        path='/session/join/:id'
        component={(props) => <JoinerAuth {...props} user={user} />}
      />
      <Route
        exact
        path='/mySessions'
        component={(props) => <YourSessions {...props} user={user} />}
      />
      <Route
        exact
        path='/SessionBreakdown/:id'
        component={(props) => <SessionMatchesView {...props} user={user} />}
      />
    </Switch>
  );
}
