import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';
import mainGif from '../../Helpers/Images/LetsEat.gif';

export default function HomePageView() {
  return (
      <Flex
        width='auto'
        alignItems='center'
        background='whitesmoke'
        mt='3%'
        mb='10%'
        justifyContent='center'
        direction='column'
        p='10'
        rounded={6}
        bgColor='rgba(255, 255, 255, 0.0)'
      >
        <Box size='lg'>
          <Image
            src={mainGif}
            alt='gif'
            objectFit='cover'
            rounded={20}
            boxShadow='xl'
          />
        </Box>
        <Link
          to={{
            pathname: '/SessionForm',
          }}
        >
          <Button colorScheme='telegram' size='lg' mt='10'>
            Start a Session!
          </Button>
        </Link>
      </Flex>
  );
}
