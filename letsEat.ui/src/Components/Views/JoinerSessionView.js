import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Alert,
  AlertIcon,
  Box,
  Spacer,
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation } from 'swiper/core';
import '../../styles/index.scss';
import SessionData from '../../Helpers/Data/SessionData';
import YelpData from '../../Helpers/Data/YelpData';
import SessionLikeData from '../../Helpers/Data/SessionLikeData';
import RestaurantData from '../../Helpers/Data/RestaurantData';
import placeholder from '../../Helpers/Images/placeholder-restaurant.png';

SwiperCore.use([Navigation]);

export default function JoinerSessionView(props) {
  const [sessionData, setSessionData] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showMatchAlert, setShowMatchAlert] = useState(false);

  useEffect(() => {
    const getYelpData = () => {
      SessionData.GetASession(props.match.params.id).then((response) => {
        setSessionData(response);
        YelpData.yelpQuery(response.location, response.searchTerm).then(
          (yelpResponse) => setRestaurants(yelpResponse),
        );
      });
    };
    getYelpData();
    SessionData.SetJoiner(props.match.params.id, props.user?.id);
  }, [props.user, props.match.params.id]);

  const likeButton = (yelpData) => {
    const restaurantObject = {
      Name: yelpData.name,
      Address: `${yelpData.location.display_address[0]}, ${yelpData.location.display_address[1]}`,
      Rating: yelpData.rating,
      Image_Url: yelpData.image_url,
      YelpUrl: yelpData.url,
      YelpId: yelpData.id,
      Distance: yelpData.distance,
    };
    RestaurantData.AddARestaurant(restaurantObject).then((responseId) => {
      const sessionLikeObject = {
        UserId: props.user?.id,
        RestaurantId: responseId,
        SessionId: sessionData.id,
      };
      SessionLikeData.AddASessionLike(sessionLikeObject).then((response) => {
        if (response === true) {
          setShowMatchAlert(true);
        } else {
          setShowAlert(true);
        }
      });
      setTimeout(() => {
        setShowAlert(false);
        setShowMatchAlert(false);
      }, 1000);
    });
  };

  return (
      <Flex
        width='70%'
        alignItems='center'
        background='whitesmoke'
        mt='1%'
        mb='10%'
        justifyContent='center'
        direction='column'
        rounded={6}
      >
        <Swiper navigation={true} className='mySwiper'>
          {restaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id}>
              <Flex
                justifyContent='center'
                alignItems='center'
                direction='column'
              >
                {showAlert && (
                  <Alert status='success'>
                    <AlertIcon />
                    {restaurant.name} was added to your likes!
                  </Alert>
                )}
                {showMatchAlert && (
                  <Alert status='success'>
                    <AlertIcon />
                    {restaurant.name} WAS A MATCH!!
                  </Alert>
                )}
                <Flex
                  alignItems='center'
                  direction='column'
                  mb='1%'
                  justifyContent='center'
                >
                  <Box p='2'>
                    <Heading className='legend'>{restaurant.name}</Heading>
                  </Box>
                  <Spacer />
                  <Box>
                    <Button
                      backgroundColor='cyan.500'
                      mx={2}
                      onClick={() => likeButton(restaurant)}
                    >
                      Like
                    </Button>
                    <a
                      href={restaurant.url}
                      target='_blank'
                      rel='noreferrer'
                      className='anchors'
                    >
                      <Button colorScheme='twitter' mx={2}>
                        More Info
                      </Button>
                    </a>
                  </Box>
                </Flex>
                {restaurant.image_url === '' ? (
                    <Image
                      src={placeholder}
                      alt='carousel'
                      objectFit='contain'
                      boxSize='80vh'
                      pb={10}
                    />
                ) : (<Image
                  src={restaurant.image_url}
                  alt='carousel'
                  objectFit='contain'
                  boxSize='80vh'
                  pb={10}
                />)}
              </Flex>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
  );
}
