import React, { Component } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from '@chakra-ui/react';
import userData from '../../Helpers/Data/UserData';

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

    handleSubmit = (e) => {
      e.preventDefault();
      const {
        FirstName,
        LastName,
        EmailAddress,
      } = this.state;
      const userObject = {
        FirstName,
        LastName,
        EmailAddress,
        Image_Url: this.state.Image_Url,
      };
      userData.AddAUser(userObject).then((response) => {
        this.setState({
          UserId: response,
        });
      });
    }

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
            <FormControl id='Image_Url' onChange={this.handleChange} isRequired>
              <FormLabel>Image Url</FormLabel>
              <Input placeholder='Image Url' />
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              onClick={this.handleSubmit}
              type="submit"
            >
              Submit
            </Button>
          </Flex>
      );
    }
}
