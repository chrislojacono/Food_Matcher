import React, { Component } from 'react';
import {
  Button,
  Flex,
  Heading,
  Box,
  Image,
} from '@chakra-ui/react';

export default class HomePageView extends Component {
  render() {
    return (
      <Flex height="30vh" width="30vw" alignItems="center" background="yellow.100" mt={300} justifyContent="center" direction='column' p="24" rounded={6} bgImg="url('../../Helpers/Images/eatBackground.jpg)">
        <Heading mb={6} fontFamily="body">Welcome to Let's Eat!</Heading>
        <Button colorScheme="cyan" size="lg" mt="10">Start a Session!</Button>
      </Flex>
    );
  }
}
