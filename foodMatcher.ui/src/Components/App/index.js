import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import fbConnection from '../../Helpers/Data/fbConnection';
import Routes from '../../Helpers/Routes';
import UserData from '../../Helpers/Data/UserData';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
    authed: null,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken()
          .then((token) => sessionStorage.setItem('token', token));
        UserData.GetSingleUser(user.uid).then((response) => {
          this.setState({ user: response });
        });
        this.setState({ authed: true });
      } else {
        this.setState({ user: false });
      }
    });
  }

  render() {
    return (
      <ChakraProvider>
      <Flex justifyContent="center" alignItems="center">
        <Router>
          <Routes user={this.state.user}/>
        </Router>
      </Flex>
      </ChakraProvider>
    );
  }
}

export default App;
