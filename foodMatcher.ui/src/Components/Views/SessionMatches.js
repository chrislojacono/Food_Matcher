import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import SessionData from '../../Helpers/Data/SessionData';
import SessionLikesData from '../../Helpers/Data/SessionLikeData';

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
    const { sessions, userId } = this.state;
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
        <Heading whiteSpace='nowrap'>Your Matches</Heading>
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        </Flex>
      </Flex>
    );
  }
}
