import React from 'react';
import {
  Image,
  Box,
  Heading,
} from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
} from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Navigation]);

export default function CarouselCard({ yelpData }) {
  return (
    <SwiperSlide>
      <Box justifyContent="center" width="100%" height="100%">
        <Image src={yelpData.image_url} alt='carousel' objectFit="contain" box="100%"/>
        <Heading className='legend'>{yelpData.name}</Heading>
      </Box>
    </SwiperSlide>
  );
}
