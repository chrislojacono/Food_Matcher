import React from 'react';
import {
  Image,
  Box,
  Heading,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export default function MatchCard({ yelpData }) {
  return (
    <Box w='350px' rounded='20px' overflow='hidden' boxShadow='md' bg='gray.200' m={2}>
      <Image src={yelpData.image_Url} alt='carousel' objectFit='cover'/>
      <Box p={5}>
        <Heading fontSize='xl' fontWeight='semibold'>
          {yelpData.name}
        </Heading>
        <Text textTransform='initial' fontSize='md' m={2} color='gray.700'>
          {Array(Math.round(yelpData.rating)).fill('').map((_, i) => (
            <StarIcon color='yellow.400'/>
          ))} &bull; {parseFloat(yelpData.distance * 0.00062137).toFixed(2)} mile(s) away
        </Text>
      </Box>
      <Flex justify='center' alignItems='center'>
      <a href={yelpData.yelpUrl} target='_blank' rel='noreferrer' className='anchors'>
      <Button bg='teal.300' ml='auto' mb={2}>More Details</Button>
      </a>
      </Flex>
    </Box>
  );
}
