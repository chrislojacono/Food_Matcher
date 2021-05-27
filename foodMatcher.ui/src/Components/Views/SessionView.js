import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import SessionData from '../../Helpers/Data/SessionData';

export default class SessionView extends Component {
   state = {
     sessionData: null,
     restaurants: [],
   }

   componentDidMount() {

   }

   render() {
     return (
      <Flex height="40%" width="40%" alignItems="center" background="whitesmoke" mt="10%" mb="10%" justifyContent="center" direction='column' p="40" rounded={6}>
          <Heading>Session View</Heading>
      </Flex>
     );
   }
}
