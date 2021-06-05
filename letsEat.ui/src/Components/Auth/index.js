import React from 'react';
import 'firebase/auth';
import { Flex } from '@chakra-ui/react';
import googleImage from './google.png';
import AuthData from '../../Helpers/Data/AuthData';

class Auth extends React.Component {
  render() {
    return (
      <Flex className='Auth' marginTop='20%'>
        <button
          onClick={AuthData.loginClickEvent}
          className='btn btn-secondary login'
        >
          <img
            className='loginButtonImg'
            src={googleImage}
            alt='google sign in'
          />
        </button>
      </Flex>
    );
  }
}

export default Auth;
