import React, { Component } from 'react';
import {
  Text,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default class SessionCard extends Component {
  render() {
    const { sessionData } = this.props;
    const date = new Date(sessionData.createdDate);
    return (
      <Flex
        justifyContent='center'
        alignItems='center'
        flexDirection="column"
        width='auto'
        border='3px'
        borderColor='turquoise'
        boxShadow='md'
        margin={5}
      >
        <Heading whiteSpace="nowrap" p={5} fontSize="1.1rem">Session from {date.toDateString()}</Heading>
        <Text fontSize='lg' p={5}>Looking for {sessionData.searchTerm} Food</Text>
        <Flex>
        <Link to={{
          pathname: `/session/${sessionData.id}`,
        }}>
        <Button backgroundColor="yellow.300" margin={3}>Keep Swiping</Button>
        </Link>
        <Link to={{
          pathname: `/SessionBreakdown/${sessionData.id}`,
        }}>
        <Button backgroundColor="turquoise" margin={3}>Session Breakdown</Button>
        </Link>
        </Flex>
      </Flex>
    );
  }
}
