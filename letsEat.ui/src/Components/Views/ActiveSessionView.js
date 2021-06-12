import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
  Image,
  Alert,
  AlertIcon,
  Spacer,
  Box,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
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

export default function SessionView(props) {
  const [sessionData, setSessionData] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
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

  const copyToClipboard = (sessionId) => {
    navigator.clipboard.writeText(
      `http://localhost:8888/session/join/${sessionId}`,
    );
    setCopiedToClipboard(true);
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
      bgColor='blue.100'
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
                <Alert status='info'>
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
              <Flex alignItems='center' direction='column' mb='1%'>
                <Box p='2'>
                  <Heading className='legend' fontSize='2.2em' mb='5px'>
                    {restaurant.name}
                  </Heading>
                </Box>
                <Spacer />
                <Box>
                  <Button
                    colorScheme='teal'
                    mx={2}
                    onClick={() => likeButton(restaurant)}
                    _hover={{
                      transform: 'scale(1.1)',
                    }}
                  >
                    Like
                  </Button>
                  <a
                    href={restaurant.url}
                    target='_blank'
                    rel='noreferrer'
                    className='anchors'
                  >
                    <Button
                      colorScheme='twitter'
                      mx={2}
                      _hover={{ transform: 'scale(1.1)' }}
                    >
                      More Info
                    </Button>
                  </a>
                  <Button
                    mx={2}
                    bg='yellow.300'
                    _hover={{
                      transform: 'scale(1.1)',
                    }}
                    onClick={() => {
                      copyToClipboard(sessionData.id);
                    }}
                  >
                    {copiedToClipboard ? 'Copied! ' : 'Share Session'}
                    <CopyIcon mx={2} />
                  </Button>
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
              ) : (
                <Image
                  src={restaurant.image_url}
                  alt='carousel'
                  objectFit='contain'
                  boxSize='80vh'
                  pb={10}
                />
              )}
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link
        to={{
          pathname: '/mySessions',
        }}
        style={{ textDecoration: 'none' }}
      >
        <Button
          colorScheme='red'
          mb={5}
          _hover={{
            transform: 'scale(1.1)',
          }}
        >
          Finish Swiping
        </Button>
      </Link>
    </Flex>
  );
}
