import React, { Component } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';

export default class UserForm extends Component {
    state = {
      UserId: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Image_Url: '',
    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };

    render() {
      return (
          <Flex direction="column" backgroundColor="whiteAlpha.900" marginTop="10%" width="40%" p="18" rounded={10}>
            <FormControl id='FirstName' onChange={this.handleChange} isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder='First name' />
            </FormControl>
            <FormControl id='LastName' onChange={this.handleChange} isRequired>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='First name' />
            </FormControl>
            <FormControl id='EmailAddress' onChange={this.handleChange} isRequired>
            <FormLabel>Email address</FormLabel>
              <Input type='email' />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
          </Flex>
      );
    }
}
