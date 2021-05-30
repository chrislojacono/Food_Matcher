import React from 'react';
import {
  Image,
  Box,
  Heading,
  Badge,
  Text,
} from '@chakra-ui/react';

export default function CarouselCard({ yelpData }) {
  return (
    <Box w='350px' rounded='20px' overflow='hidden' boxShadow='md' bg='gray.200'>
      <Image src={yelpData.image_Url} alt='carousel' objectFit='contain' />
      <Box p={5}>
        <Badge varient='solid' rounded='full' bg='green.300' px={3} mb={2}>Match!!
        </Badge>
        <Heading fontSize='xl' fontWeight='semibold'>
          {yelpData.name}
        </Heading>
        <Text textTransform='uppercase' fontSize='md' color='gray.700'>
          {yelpData.rating}/5 stars &bull; {yelpData.distance} meters away
        </Text>
      </Box>
    </Box>
  );
}
