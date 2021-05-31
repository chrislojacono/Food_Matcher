import React from 'react';
import Auth from '../Auth';
import JoinerSession from './JoinerSessionView';
import Loader from '../Loader';

export default function JoinerAuth(props) {
  const loadComponent = () => {
    let component = '';
    if (props.user === null) {
      component = <Loader />;
    } else if (props.user) {
      component = <JoinerSession />;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return loadComponent();
}
