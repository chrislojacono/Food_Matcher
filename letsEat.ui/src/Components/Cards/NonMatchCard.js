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
import placeholder from '../../Helpers/Images/placeholder-restaurant.png';

export default function MatchCard({ yelpData, removeALike }) {
  return (
    <Box
      w='300px'
      rounded='20px'
      overflow='hidden'
      boxShadow='md'
      bg='gray.200'
      m={2}
      px='5px'
    >
      {yelpData.image_Url === '' ? (
        <Image
          src={placeholder}
          alt='carousel'
          objectFit='contain'
          boxSize='300px'
          pb={10}
        />
      ) : (
        <Image
          src={yelpData.image_Url}
          alt='carousel'
          objectFit='contain'
          boxSize='350px'
          pb={10}
        />
      )}
      <Box p={5}>
        <Heading fontSize='xl' fontWeight='semibold'>
          {yelpData.name}
        </Heading>
        <Text textTransform='initial' fontSize='md' m={2} color='gray.700'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                color={i < yelpData.rating ? 'yellow.500' : 'gray.300'}
                key={i}
              />
            ))}{' '}
          &bull; {parseFloat(yelpData.distance * 0.00062137).toFixed(2)} mile(s)
          away
        </Text>
      </Box>
      <Flex justify='center' alignItems='center'>
        <a
          href={yelpData.yelpUrl}
          target='_blank'
          rel='noreferrer'
          className='anchors'
        >
          <Button bg='teal.300' m={1} mb={2}>
            More Details
          </Button>
        </a>
        <Button
          bg='red.300'
          m={1}
          px='10px'
          mb={2}
          onClick={() => {
            removeALike(yelpData.id);
          }}
        >
          Remove this Like
        </Button>
      </Flex>
    </Box>
  );
}
