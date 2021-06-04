import React, { Component } from 'react';
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
import SwiperCore, {
  Navigation,
} from 'swiper/core';
import '../../styles/index.scss';
import SessionData from '../../Helpers/Data/SessionData';
import YelpData from '../../Helpers/Data/YelpData';
import SessionLikeData from '../../Helpers/Data/SessionLikeData';
import RestaurantData from '../../Helpers/Data/RestaurantData';

SwiperCore.use([Navigation]);

export default class SessionView extends Component {
  state = {
    sessionData: null,
    restaurants: [],
    ShowAlert: false,
    userId: this.props.user?.id,
    copiedToClipboard: false,
    showMatchAlert: false,
  };

  componentDidMount() {
    SessionData.GetASession(this.props.match.params.id).then((response) => {
      this.setState({
        sessionData: response,
      });
      YelpData.yelpQuery(response.location, response.searchTerm).then(
        (yelpResponse) => {
          this.setState({
            restaurants: yelpResponse,
          });
        },
      );
    });
  }

  likeButton = (yelpData) => {
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
      const { sessionData, userId } = this.state;
      const sessionLikeObject = {
        UserId: userId,
        RestaurantId: responseId,
        SessionId: sessionData.id,
      };
      SessionLikeData.AddASessionLike(sessionLikeObject).then((response) => {
        if (response === true) {
          this.setState({
            showMatchAlert: true,
          });
        } else {
          this.setState({
            ShowAlert: true,
          });
        }
      });
      setTimeout(() => {
        this.setState({
          ShowAlert: false,
          showMatchAlert: false,
        });
      }, 1000);
    });
  }

  copyToClipboard = (sessionId) => {
    navigator.clipboard.writeText(`http://localhost:8888/session/join/${sessionId}`);
    this.setState({
      copiedToClipboard: true,
    });
  }

  render() {
    const {
      restaurants,
      ShowAlert,
      sessionData,
      copiedToClipboard,
      showMatchAlert,
    } = this.state;
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
            <>
              <SwiperSlide key={restaurant.id}>
                <Flex
                  justifyContent='center'
                  alignItems='center'
                  direction='column'
                >
                  {ShowAlert && (
                    <Alert status='success'>
                      <AlertIcon />
                      {restaurant.name} was added to your likes!
                    </Alert>
                  )}
                  {showMatchAlert && (<Alert status="success">
                    <AlertIcon />
                    {restaurant.name} WAS A MATCH!!
                    </Alert>)}
                  <Flex alignItems='center'>
                    <Box p='2'>
                    <Heading className='legend'>
                      {restaurant.name}
                    </Heading>
                    </Box>
                    <Spacer />
                    <Box pl='40px'>
                    <Button
                      backgroundColor='cyan.500'
                      ml='auto'
                      mx={2}
                      onClick={() => this.likeButton(restaurant)}
                    >
                      Like
                    </Button>
                    <Button mx={4} bg='yellow.300' onClick={() => {
                      this.copyToClipboard(sessionData.id);
                    }}>{copiedToClipboard ? 'Copied!' : 'Share Link with a friend!'}<CopyIcon mx={2}/></Button>
                    </Box>
                  </Flex>
                  <Image
                    src={restaurant.image_url}
                    alt='carousel'
                    objectFit='cover'
                  />
                </Flex>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </Flex>
    );
  }
}
