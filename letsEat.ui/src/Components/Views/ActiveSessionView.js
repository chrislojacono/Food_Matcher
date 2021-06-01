import React, { Component } from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Alert,
  AlertIcon,
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
    ShowAlert: false,
    userId: this.props.user?.id,
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
      SessionLikeData.AddASessionLike(sessionLikeObject);
      this.setState({
        ShowAlert: true,
      });
      setTimeout(() => {
        this.setState({
          ShowAlert: false,
        });
      }, 2000);
    });
  }

  render() {
    const { restaurants, ShowAlert } = this.state;
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
                <Flex justifyContent="center" alignItems="center" direction="column">
                {ShowAlert
                && <Alert status="success">
                    <AlertIcon />
                    {restaurant.name} was added to your likes!
                    </Alert>}
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
