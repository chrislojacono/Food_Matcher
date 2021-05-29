import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleImage from './google.png';
import AuthData from '../../Helpers/Data/AuthData';

class Auth extends React.Component {
  render() {
    return (
      <div className='Auth'>
          <button onClick={AuthData.loginClickEvent} className='btn btn-secondary login'>
          <img className='loginButtonImg'src={googleImage} alt='google sign in' />
        </button>
      </div>
    );
  }
}

export default Auth;
