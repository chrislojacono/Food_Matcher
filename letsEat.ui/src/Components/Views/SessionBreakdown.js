import React, { useEffect, useState } from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';
import SessionLikesData from '../../Helpers/Data/SessionLikeData';
import NonMatchCard from '../Cards/NonMatchCard';
import MatchCard from '../Cards/MatchCard';
import FinalDecisionData from '../../Helpers/Data/FinalDecisionData';
import FinalCard from '../Cards/FinalCard';
import RestaurantData from '../../Helpers/Data/RestaurantData';
import SessionData from '../../Helpers/Data/SessionData';

export default function SessionMatchesView(props) {
  const [yourLikedRestaurants, setYourLikedRestaurants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [sessionId] = useState(props.match.params.id);
  const [userId] = useState(props.user?.id);
  const [finalDecision, setFinalDecision] = useState('');
  const [sessionObject, setSessionObject] = useState('');

  useEffect(() => {
    loadContent();
    getFinalDecision();
    getSessionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, userId]);

  const loadContent = () => {
    SessionLikesData.GetMatches(props.match.params.id).then((response) => {
      setMatches(response);
    });
    SessionLikesData.GetLikesOfAUserPerSession(
      props.user?.id,
      props.match.params.id,
    ).then((response) => {
      setYourLikedRestaurants(response);
    });
  };

  const getSessionData = () => {
    SessionData.GetASession(sessionId).then((response) => {
      setSessionObject(response);
    });
  };

  const getFinalDecision = () => {
    FinalDecisionData.GetAFinalDecision(sessionId).then((response) => {
      setFinalDecision(response);
    });
  };

  const makeAFinalDecision = (restaurantId) => {
    const finalObject = {
      SessionId: sessionId,
      RestaurantId: restaurantId,
    };
    FinalDecisionData.AddAFinalDecision(finalObject).then(() => {
      getFinalDecision();
    });
  };

  const removeALike = (restaurantId) => {
    SessionLikesData.RemoveALike(userId, sessionId, restaurantId).then(() => {
      loadContent();
    });
  };

  const getRandomRestaurant = () => {
    RestaurantData.GetRandomRestaurant(sessionId).then((response) => {
      makeAFinalDecision(response.id);
    });
  };

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
              <Heading
                m={2}
                p={4}
                textDecoration='underline'
                rounded={4}
                whiteSpace='nowrap'
              >
                The Final!
              </Heading>
              <Flex justify='center' align='center' flexWrap='wrap'>
                <FinalCard key={finalDecision.id} yelpData={finalDecision} />
              </Flex>
            </>
          </Flex>
        )}
        {sessionObject.user2Id !== null && (
          <Button colorScheme='orange' onClick={getRandomRestaurant}>
            Decide For Us!
          </Button>
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
            <Heading
              m={2}
              p={4}
              textDecoration='underline'
              rounded={4}
              whiteSpace='nowrap'
            >
              You guys agreed on
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
                  makeFinalDecision={makeAFinalDecision}
                />
              ))}
            </Flex>
          </Flex>
        ) : (
          <></>
        )}
        <Flex
          direction='column'
          justify='center'
          align='center'
          bg='blanchedAlmond'
          w='98%'
          rounded='20px'
          my={2}
        >
          <Heading
            m={2}
            p={4}
            textDecoration='underline'
            rounded={4}
            whiteSpace='nowrap'
          >
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
                removeALike={removeALike}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
