import React, { Component } from 'react';
import {
  Flex,
  Heading,
} from '@chakra-ui/react';
import SessionData from '../../Helpers/Data/SessionData';
import SessionCard from '../Cards/SessionCard';

export default class YourSessionsView extends Component {
  state = {
    sessions: [],
    userId: this.props.user?.id,
  }

  componentDidMount() {
    const { userId } = this.state;
    if (userId !== undefined) {
      SessionData.GetASessionByUserId(userId).then((response) => {
        this.setState({
          sessions: response,
        });
      });
    }
  }

  render() {
    const { sessions, userId } = this.state;
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
        bgGradient="linear(red.100 25%, orange.100 50%, yellow.100 100%)"
      >
        <Heading whiteSpace='nowrap'>Your Sessions</Heading>
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        {sessions.length ? (
          sessions.map((session) => <SessionCard sessionData={session} userId={userId} key={session.id} />)
        ) : (
          <></>
        )}
        </Flex>
      </Flex>
    );
  }
}
