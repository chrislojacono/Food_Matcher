import React, { useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import SessionData from '../../Helpers/Data/SessionData';
import SessionCard from '../Cards/SessionCard';

export default function YourSessionsView({ user }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    SessionData.GetASessionByUserId(user?.id).then((response) => {
      setSessions(response);
    });
  }, [user?.id]);

  return (
      <Flex
        height='70%'
        width='auto'
        alignItems='center'
        background='whitesmoke'
        mt='2%'
        mb='10%'
        justifyContent='center'
        direction='column'
        rounded={6}
        bgGradient='linear(red.200 25%, orange.200 50%, yellow.200 100%)'
      >
        <Heading whiteSpace='nowrap'>Your Sessions</Heading>
        <Flex justifyContent='center' alignItems='center' flexWrap='wrap'>
          {sessions.length ? (
            sessions.map((session) => (
              <SessionCard
                sessionData={session}
                userId={user?.id}
                key={session.id}
              />
            ))
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
  );
}
