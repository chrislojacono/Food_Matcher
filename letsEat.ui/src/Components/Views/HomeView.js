import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react';
import mainGif from '../../Helpers/Images/LetsEat.gif';

export default class HomePageView extends Component {
  render() {
    return (
      <Flex
        height='40%'
        width='40%'
        alignItems='center'
        background='whitesmoke'
        mt='3%'
        mb='10%'
        justifyContent='center'
        direction='column'
        p='10'
        rounded={6}
        bgGradient='linear(blue.100 25%, green.100 50%, orange.100 100%)'
      >
        <Heading mb={6} whiteSpace='nowrap' textShadow='xl'>
          Welcome to Let's Eat!
        </Heading>
        <Box size='lg'>
          <Image src={mainGif} alt='gif' objectFit='cover'/>
        </Box>
        <Link
          to={{
            pathname: '/SessionForm',
          }}
        >
          <Button colorScheme='teal' size='lg' mt='10'>
            Start a Session!
          </Button>
        </Link>
      </Flex>
    );
  }
}
