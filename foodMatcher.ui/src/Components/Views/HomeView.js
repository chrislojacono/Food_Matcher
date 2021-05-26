import React, { Component } from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import BusinessCard from '../Cards/yelpBusinessCard';
import YelpData from '../../Helpers/Data/YelpData';

export default class HomePageView extends Component {
  state = {
  };

  render() {
    return (
      <Flex height="100vh" width="90vw" alignItems="center" background="yellow.100" justifyContent="center" direction='column' p="24" rounded={6}>
        <Heading mb={6}>Welcome to Let's Eat!</Heading>
        <Button colorScheme="cyan" size="lg">Start a Session!</Button>
      </Flex>
    );
  }
}
