import React, { Component } from 'react';
import {
  Flex,
  Heading,
} from '@chakra-ui/react';
import SessionLikesData from '../../Helpers/Data/SessionLikeData';
import YelpCard from '../Cards/yelpBusinessCard';
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
        mt='10%'
        mb='10%'
        justifyContent='center'
        direction='column'
        rounded={6}
      >
        <Heading whiteSpace='nowrap'>Session Breakdown</Heading>
        <Flex justifyContent="center" direction="column" alignItems="center" flexWrap="wrap">
        <h2>You guys agreed on</h2>
            <Flex justify="center" align="center">
                {matches.map((restaurant) => <MatchCard key={restaurant.id} yelpData={restaurant}/>)}
            </Flex>
            <h2>You liked</h2>
            <Flex justify="center" alignItems="center">
                {yourLikedRestaurants.map((restaurant) => <YelpCard key={restaurant.id} yelpData={restaurant}/>)}
            </Flex>
        </Flex>
      </Flex>
    );
  }
}
