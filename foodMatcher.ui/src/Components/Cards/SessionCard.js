import React, { Component } from 'react';
import {
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';

export default class SessionCard extends Component {
  render() {
    const { sessionData } = this.props;
    const date = new Date(sessionData.createdDate);
    return (
      <Flex
        justifyContent='center'
        alignItems='center'
        flexDirection="column"
        width='30%'
        border='3px'
        borderColor='turquoise'
        boxShadow='md'
        margin={5}
      >
        <Heading whiteSpace="nowrap" p={5} fontSize="1.1rem">Session from {date.toDateString()}</Heading>
        <Text fontSize='lg' p={5}>Looking for {sessionData.searchTerm} Food</Text>
      </Flex>
    );
  }
}
