import React, { Component } from 'react';
import {
  Flex,
  Heading,
} from '@chakra-ui/react';
import SessionLikesData from '../../Helpers/Data/SessionLikeData';
import NonMatchCard from '../Cards/NonMatchCard';
import MatchCard from '../Cards/MatchCard';

export default class SessionMatchesView extends Component {
  state = {
    yourLikedRestaurants: [],
    matches: [],
    userId: this.props.user?.id,
    sessionId: this.props.match.params.id,
  }

  componentDidMount() {
    const { userId, sessionId } = this.state;
    SessionLikesData.GetMatches(sessionId).then((response) => {
      this.setState({
        matches: response,
      });
    });
    SessionLikesData.GetLikesOfAUserPerSession(userId, sessionId).then((response) => {
      this.setState({
        yourLikedRestaurants: response,
      });
    });
  }

  render() {
    const {
      matches,
      yourLikedRestaurants,
    } = this.state;
    return (
      <Flex
        height='70%'
        width='70%'
        alignItems='center'
        background='whitesmoke'
        mt='1%'
        mb='10%'
        justifyContent='center'
        direction='column'
        rounded={6}
      >
        <Flex
          justifyContent='center'
          direction='column'
          alignItems='center'
          flexWrap='wrap'
        >
          <Heading
            m={2}
            bg='yellow.100'
            p={4}
            textDecoration='underline'
            rounded={4}
          >
            You guys agreed on
          </Heading>
          <Flex
            justify='center'
            align='center'
            flexWrap='wrap'
            bg='green.200'
            w='98%'
            rounded='20px'
          >
            {matches.map((restaurant) => (
              <MatchCard key={restaurant.id} yelpData={restaurant} />
            ))}
          </Flex>
          <Heading
            m={2}
            bg='blue.100'
            p={4}
            textDecoration='underline'
            rounded={4}
          >
            You liked
          </Heading>
          <Flex
            justify='center'
            alignItems='center'
            flexWrap='wrap'
            bg='blanchedalmond'
            w='98%'
            rounded='20px'
          >
            {yourLikedRestaurants.map((restaurant) => (
              <NonMatchCard key={restaurant.id} yelpData={restaurant} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
