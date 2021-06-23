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
import placeholder from '../../Helpers/Images/placeholder-restaurant.png';

export default function MatchCard({
  yelpData,
  finalCard,
  match,
  makeFinalDecision,
  like,
  removeALike,
}) {
  return (
    <Box
      w='300px'
      rounded='20px'
      overflow='hidden'
      boxShadow='lg'
      bg='gray.200'
      m={2}
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
        {finalCard && (
        <Badge varient='solid' rounded='full' bg='green.300' px={3} mb={2}>
        Let's Eat!!
        </Badge>
        )}
        {match && (
        <Badge varient='solid' rounded='full' bg='green.300' px={3} mb={2}>
          Match!!
        </Badge>
        )}
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
          <Button bg='teal.300' mb={2}>
            More Details
          </Button>
        </a>
        {match && (
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
        )}
        {like && (
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
        )}
      </Flex>
    </Box>
  );
}
