import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Heading,
  Radio,
  RadioGroup,
  HStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import userData from '../../Helpers/Data/UserData';

class UserForm extends Component {
    state = {
      UserId: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Image_Url: '',
<<<<<<< HEAD
=======
      userForm: true,
      Location: '',
      SearchTerm: 'Pizza',
      ShowAlert: false,
>>>>>>> main
    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };

    handleSubmit1 = (e) => {
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
        // Image_Url: this.state.Image_Url,
      };
      userData.AddAUser(userObject).then((response) => {
        this.setState({
          UserId: response,
          userForm: false,
        });
      });
    }

<<<<<<< HEAD
=======
    handleSubmit2 = (e) => {
      e.preventDefault();
      const {
        Location,
        SearchTerm,
        UserId,
      } = this.state;
      const sessionObject = {
        Location,
        SearchTerm,
        User1Id: UserId,
      };
      sessionData.AddASession(sessionObject).then((responseId) => {
        this.setState({
          ShowAlert: true,
        });
        setTimeout(() => {
          setTimeout(() => {
            this.props.history.push(`/session/${responseId}`);
          }, 3000);
        });
      });
    }

>>>>>>> main
    render() {
      const { userForm, ShowAlert } = this.state;

      return (
        <>
<<<<<<< HEAD
       <Flex direction="column" backgroundColor="whiteSmoke" marginTop="10%" width="40%" p="18" rounded={10}>
=======
        {userForm ? <Flex direction="column" backgroundColor="whiteSmoke" marginTop="10%" width="40%" p="18" rounded={10}>
>>>>>>> main
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
        {/* <FormControl id='Image_Url' onChange={this.handleChange} isRequired>
          <FormLabel>Image Url</FormLabel>
          <Input placeholder='Image Url' />
        </FormControl> */}
        <Button
          mt={4}
          colorScheme="teal"
          onClick={this.handleSubmit1}
          type="submit"
        >
          Submit
        </Button>
      </Flex>
<<<<<<< HEAD
=======
          : <>
        <Flex direction="column" backgroundColor="whiteSmoke" marginTop="10%" width="40%" p="18" rounded={10} flexWrap="wrap">
        {ShowAlert
          && <Alert status="success">
                <AlertIcon />
                Your session has been created!
            </Alert>}
        <FormControl as="fieldset">
        <FormLabel as="legend">What are you in the mood for?</FormLabel>
          <RadioGroup defaultValue="Pizza">
            <HStack spacing="30px" wrap="wrap" justify="center">
              <Radio value="Pizza" id="SearchTerm" onChange={this.handleChange}>Pizza</Radio>
              <Radio value="Mexican" id="SearchTerm" onChange={this.handleChange}>Mexican</Radio>
              <Radio value="Greek" id="SearchTerm" onChange={this.handleChange}>Greek</Radio>
              <Radio value="Indian" id="SearchTerm" onChange={this.handleChange}>Indian</Radio>
              <Radio value="Thai" id="SearchTerm" onChange={this.handleChange}>Thai</Radio>
              <Radio value="Italian" id="SearchTerm" onChange={this.handleChange}>Italian</Radio>
              <Radio value="French" id="SearchTerm" onChange={this.handleChange}>French</Radio>
              <Radio value="Dessert" id="SearchTerm" onChange={this.handleChange}>Dessert</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl id='Location' onChange={this.handleChange} isRequired>
          <FormLabel>Where are you heading?</FormLabel>
          <Input placeholder='ex: Nashville, Tn' />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={this.handleSubmit2}
          type="submit"
        >
          Submit
        </Button>
      </Flex>
      </>}
>>>>>>> main
      </>
      );
    }
}

export default withRouter(UserForm);
