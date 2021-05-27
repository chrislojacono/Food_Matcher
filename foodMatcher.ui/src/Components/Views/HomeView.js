import React, { Component } from 'react';
import {
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';

export default class HomePageView extends Component {
  render() {
    return (
      <Flex height="40%" width="40%" alignItems="center" background="yellow.100" mt="10%" mb="10%" justifyContent="center" direction='column' p="40" rounded={6} bgImg="url('../../Helpers/Images/eatBackground.jpg)">
        <Heading mb={6} fontFamily="body">Welcome to Let's Eat!</Heading>
        <Button colorScheme="cyan" size="lg" mt="10">Start a Session!</Button>
      </Flex>
    );
  }
}
