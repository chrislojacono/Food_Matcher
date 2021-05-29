import React, { Component } from 'react';
import {
  Text,
  Box,
  Heading,
} from '@chakra-ui/react';
import { render } from '@testing-library/react';

export default class SessionCard extends Component {
  render() {
    const { sessionData } = this.props;
    const date = new Date(sessionData.createdDate);
    return (
      <Box
        justifyContent='center'
        alignItems='center'
        flexDirection="row"
        width='30%'
        border='3px'
        borderColor='turquoise'
        boxShadow='md'
        margin={5}
      >
        <Heading whiteSpace="nowrap" p={5} fontSize="1.5em">Session from {date.toDateString()}</Heading>
        <Text fontSize='lg' p={5}>Looking for {sessionData.searchTerm} Food</Text>
      </Box>
    );
  }
}
