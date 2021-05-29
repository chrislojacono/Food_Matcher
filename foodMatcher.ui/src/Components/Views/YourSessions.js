import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import SessionData from '../../Helpers/Data/SessionData';

export default class YourSessionsView extends Component {
  state = {
    sessions: [],
    userId: this.props.user?.id,
  }

  componentDidMount() {
    const { userId } = this.state;
    if (userId != undefined) {
      SessionData.GetASessionByUserId(userId).then((response) => {
        this.setState({
          sessions: response,
        });
      });
    }
  }

  render() {
    return (
      <Flex height="40%" width="40%" alignItems="center" background="whitesmoke" mt="10%" mb="10%" justifyContent="center" direction='column'rounded={6}>
        <Heading whiteSpace="nowrap">Your Sessions</Heading>
      </Flex>
    );
  }
}
