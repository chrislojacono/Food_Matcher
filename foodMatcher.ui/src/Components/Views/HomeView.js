import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';

export default class HomePageView extends Component {
  render() {
    return (
      <Flex height="40%" width="40%" alignItems="center" background="whitesmoke" mt="10%" mb="10%" justifyContent="center" direction='column' p="40" rounded={6} bgImg="url('../../Helpers/Images/eatBackground.jpg)">
        <Heading mb={6} fontFamily="body">Welcome to Let's Eat!</Heading>
        <Link to={{
          pathname: '/userForm',
        }}>
        <Button colorScheme="teal" size="lg" mt="10">Start a Session!</Button>
        </Link>
      </Flex>
    );
  }
}
