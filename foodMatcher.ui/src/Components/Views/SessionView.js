import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react';
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
      Id: yelpData.id,
      Name: yelpData.name,
      Address: `${yelpData.location.display_address[0]}, ${yelpData.location.display_address[1]}`,
      Rating: yelpData.rating,
      Image_Url: yelpData.image_url,
      YelpUrl: yelpData.url,
      Distance: yelpData.distance,
    };
    const { sessionData } = this.state;
    const sessionLikeObject = {
      UserId: sessionData.user1Id,
      RestaurantId: yelpData.id,
      SessionId: sessionData.id,
    };
    RestaurantData.AddARestaurant(restaurantObject).then(() => {
      SessionLikeData.AddASessionLike(sessionLikeObject);
    });
  }

  render() {
    const { restaurants } = this.state;
    return (
      <Flex
        height='40%'
        width='70%'
        alignItems='center'
        background='whitesmoke'
        mt='5%'
        mb='10%'
        justifyContent='center'
        direction='column'
        p='40'
        rounded={6}
      >
        <Swiper navigation={true} className='mySwiper'>
          {restaurants.map((restaurant) => (
                <SwiperSlide key={restaurant.id}>
                <Flex justifyContent="center" alignItems="center" direction="column">
                  <Flex justifyContent="space-around" alignItems="center">
                  <Heading className='legend' margin={30}>{restaurant.name}</Heading>
                  <Button backgroundColor="cyan.500" ml="auto" onClick={() => this.likeButton(restaurant)}>Like</Button>
                  </Flex>
                  <Image src={restaurant.image_url} alt='carousel' objectFit="cover"/>
                </Flex>
              </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    );
  }
}
