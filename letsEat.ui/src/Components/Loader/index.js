import React from 'react';
import { Flex } from '@chakra-ui/react';
import { FlapperSpinner } from 'react-spinners-kit';

export default function Loader() {
  return (
  <Flex mt='10%'>
    <FlapperSpinner size={300} color="#1FA5A3"/>
  </Flex>
  );
}
