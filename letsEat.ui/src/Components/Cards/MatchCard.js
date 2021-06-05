import React from 'react';
import {
  Image,
  Box,
  Heading,
  Badge,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export default function MatchCard({ yelpData, makeFinalDecision }) {
  return (
    <Box
      w='350px'
      rounded='20px'
      overflow='hidden'
      boxShadow='md'
      bg='gray.200'
      m={2}
    >
      <Image
        src={yelpData.image_Url}
        alt='carousel'
        objectFit='contain'
        boxSize='350px'
      />
      <Box p={5}>
        <Badge varient='solid' rounded='full' bg='green.300' px={3} mb={2}>
          Match!!
        </Badge>
        <Heading fontSize='xl' fontWeight='semibold'>
          {yelpData.name}
        </Heading>
        <Text textTransform='initial' fontSize='md' m={2} color='gray.700'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < yelpData.rating ? 'yellow.500' : 'gray.300'}
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
          <Button bg='teal.300' mb={2}>
            More Details
          </Button>
        </a>
        <Button
          bg='green.300'
          mx={2}
          mb={2}
          onClick={() => {
            makeFinalDecision(yelpData.id);
          }}
        >
          Let's Eat
        </Button>
      </Flex>
    </Box>
  );
}
