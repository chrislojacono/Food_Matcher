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
      <Flex height="40%" width="40%" alignItems="center" background="whitesmoke" mt="3%" mb="10%" justifyContent="center" direction='column' p="40" rounded={6} bgGradient="linear(red.100 25%, orange.100 50%, yellow.100 100%)">
        <Heading mb={6} whiteSpace="nowrap">Welcome to Let's Eat!</Heading>
        <Link to={{
          pathname: '/SessionForm',
        }}>
        <Button colorScheme="teal" size="lg" mt="10">Start a Session!</Button>
        </Link>
      </Flex>
    );
  }
}
