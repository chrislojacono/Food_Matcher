import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Link } from 'react-router-dom';
import { Flex, Heading, Button } from '@chakra-ui/react';
import SessionLikesData from '../../Helpers/Data/SessionLikeData';
import NonMatchCard from '../Cards/NonMatchCard';
import MatchCard from '../Cards/MatchCard';
import FinalDecisionData from '../../Helpers/Data/FinalDecisionData';
import FinalCard from '../Cards/FinalCard';
import RestaurantData from '../../Helpers/Data/RestaurantData';
import SessionData from '../../Helpers/Data/SessionData';
import ChatRoom from '../Messaging/ChatRoom';

export default function SessionBreakdown(props) {
  const [yourLikedRestaurants, setYourLikedRestaurants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [sessionId] = useState(props.match.params.id);
  const [userId] = useState(props.user?.id);
  const [finalDecision, setFinalDecision] = useState('');
  const [sessionObject, setSessionObject] = useState('');
  const [signalConnection, setConnection] = useState();
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    loadContent();
    getFinalDecision();
    getSessionData();
    JoinRoomConnection();
    setDidMount(true);
    return () => setDidMount(false);
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
      if (response == null) {
        return null;
      }
      if (signalConnection) {
        refreshFinalDecision();
      }
      return setFinalDecision(response);
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

  const JoinRoomConnection = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:44371/session')
        .configureLogging(LogLevel.Information)
        .build();

      connection.on('GetFinals', () => {
        getFinalDecision();
      });

      await connection.start();
      await connection.invoke('JoinRoom', { userId, sessionId });

      setConnection(connection);
    } catch (e) {
      console.warn(e);
    }
  };

  const refreshFinalDecision = async () => {
    try {
      await signalConnection.invoke('GetFinalDecision', sessionId);
    } catch (e) {
      console.warn(e);
    }
  };

  if (!didMount) {
    return null;
  }

  return (
    <Flex justify='center' align='center' direction='column' width='auto'>
      <ChatRoom userId={userId} sessionId={sessionId} />
      <Flex
        justifyContent='center'
        direction='column'
        alignItems='center'
        flexWrap='wrap'
        width='auto'
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
            w='100%'
            rounded='20px'
          >
            {yourLikedRestaurants.length ? (
              yourLikedRestaurants.map((restaurant) => (
                <NonMatchCard
                  key={restaurant.id}
                  yelpData={restaurant}
                  removeALike={removeALike}
                />
              ))
            ) : (
              <Flex direction='column' justify='center' align='center'>
                <Heading>No Likes Yet</Heading>
                <Link
                  to={{
                    pathname: `/session/${sessionId}`,
                  }}
                >
                  <Button backgroundColor='yellow.300' margin={3}>
                    Keep Swiping
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
