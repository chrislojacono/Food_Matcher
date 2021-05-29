import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
import sessionData from '../../Helpers/Data/SessionData';

class SessionForm extends Component {
    state = {
      UserId: this.props.user.id,
      Location: '',
      SearchTerm: 'Pizza',
      ShowAlert: false,
    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };

    handleSubmit = (e) => {
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

    render() {
      const { ShowAlert } = this.state;

      return (
        <>
        <Flex direction="column" backgroundColor="whiteSmoke" marginTop="10%" width="40%" p="18" rounded={10} flexWrap="wrap">
        {ShowAlert
          && <Alert status="success" marginY="5px">
                <AlertIcon />
                Your session has been created!
            </Alert>}
        <FormControl as="fieldset">
        <FormLabel as="legend">What are you in the mood for?</FormLabel>
          <RadioGroup defaultValue="Pizza">
            <HStack spacing="30px" wrap="wrap" justify="center">
              <Radio value="Pizza" id="SearchTerm" onChange={this.handleChange}>Pizza</Radio>
              <Radio value="Mexican" id="SearchTerm" onChange={this.handleChange}>Mexican</Radio>
              <Radio value="Healthy" id="SearchTerm" onChange={this.handleChange}>Healthy</Radio>
              <Radio value="Vegan" id="SearchTerm" onChange={this.handleChange}>Vegan</Radio>
              <Radio value="Chinese" id="SearchTerm" onChange={this.handleChange}>Chinese</Radio>
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
          onClick={this.handleSubmit}
          type="submit"
        >
          Submit
        </Button>
      </Flex>
      </>
      );
    }
}

export default withRouter(SessionForm);
