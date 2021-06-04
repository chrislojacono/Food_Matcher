import React, { Component } from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';
import SessionLikesData from '../../Helpers/Data/SessionLikeData';
import NonMatchCard from '../Cards/NonMatchCard';
import MatchCard from '../Cards/MatchCard';
import FinalDecisionData from '../../Helpers/Data/FinalDecisionData';
import FinalCard from '../Cards/FinalCard';
import RestaurantData from '../../Helpers/Data/RestaurantData';
import SessionData from '../../Helpers/Data/SessionData';

export default class SessionMatchesView extends Component {
  state = {
    yourLikedRestaurants: [],
    matches: [],
    userId: this.props.user?.id,
    sessionId: this.props.match.params.id,
    finalDecision: '',
    sessionObject: '',
  };

  componentDidMount() {
    this.loadContent();
    this.getFinalDecision();
    this.getSessionData();
  }

  loadContent = () => {
    const { userId, sessionId } = this.state;
    SessionLikesData.GetMatches(sessionId).then((response) => {
      this.setState({
        matches: response,
      });
    });
    SessionLikesData.GetLikesOfAUserPerSession(userId, sessionId).then(
      (response) => {
        this.setState({
          yourLikedRestaurants: response,
        });
      },
    );
  }

  getSessionData = () => {
    SessionData.GetASession(this.state.sessionId).then((response) => {
      this.setState({
        sessionObject: response,
      });
    });
  }

  getFinalDecision = () => {
    const { sessionId } = this.state;
    FinalDecisionData.GetAFinalDecision(sessionId).then((response) => {
      this.setState({
        finalDecision: response,
      });
    });
  };

  makeAFinalDecision = (restaurantId) => {
    const { sessionId } = this.state;
    const finalObject = {
      SessionId: sessionId,
      RestaurantId: restaurantId,
    };
    FinalDecisionData.AddAFinalDecision(finalObject).then(() => {
      this.getFinalDecision();
    });
  };

  removeALike = (restaurantId) => {
    const { sessionId, userId } = this.state;
    SessionLikesData.RemoveALike(userId, sessionId, restaurantId).then(() => {
      this.loadContent();
    });
  }

  getRandomRestaurant = () => {
    const { sessionId } = this.state;
    RestaurantData.GetRandomRestaurant(sessionId).then((response) => {
      this.makeAFinalDecision(response.id);
    });
  }

  render() {
    const {
      matches,
      yourLikedRestaurants,
      finalDecision,
      sessionObject,
    } = this.state;
    return (
      <Flex
        height='70%'
        width='70%'
        alignItems='center'
        background='grey.200'
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
          {finalDecision !== '' && (
            <Flex
              direction='column'
              justify='center'
              align='center'
              bg='green.200'
              w='98%'
              rounded='20px'
              my={2}
            >
                <>
                  <Heading m={2} p={4} textDecoration='underline' rounded={4}>
                    The Final!
                  </Heading>
                  <Flex justify='center' align='center' flexWrap='wrap'>
                    <FinalCard
                      key={finalDecision.id}
                      yelpData={finalDecision}
                    />
                  </Flex>
                </>
            </Flex>
          )}
          {sessionObject.user2Id !== null && (
          <Button colorScheme='orange' onClick={this.getRandomRestaurant}>Decide For Us!</Button>
          )}
          {matches.length ? (
          <Flex
          direction='column'
          justify='center'
          align='center'
          bg='blue.200'
          w='98%'
          rounded='20px'
          my={2}
        >
          <Heading m={2} p={4} textDecoration='underline' rounded={4}>
            You guys agreed on:
          </Heading>
          <Flex
            justify='center'
            align='center'
            flexWrap='wrap'
            bg='blue.200'
            w='98%'
            rounded='20px'
          >
            {matches.map((restaurant) => (
              <MatchCard
                key={restaurant.id}
                yelpData={restaurant}
                makeFinalDecision={this.makeAFinalDecision}
              />
            ))}
          </Flex>
        </Flex>
          ) : (<></>)}
          <Flex
            direction='column'
            justify='center'
            align='center'
            bg='blanchedAlmond'
            w='98%'
            rounded='20px'
            my={2}
          >
            <Heading m={2} p={4} textDecoration='underline' rounded={4}>
              Your Likes
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
                <NonMatchCard
                  key={restaurant.id}
                  yelpData={restaurant}
                  removeALike={this.removeALike}
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
