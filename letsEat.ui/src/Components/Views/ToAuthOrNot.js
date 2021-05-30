import React from 'react';
import Auth from '../Auth';
import HomeView from './HomeView';
import Loader from '../Loader';

export default function Home(props) {
  const loadComponent = () => {
    let component = '';
    if (props.user === null) {
      component = <Loader />;
    } else if (props.user) {
      component = <HomeView />;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return loadComponent();
}
