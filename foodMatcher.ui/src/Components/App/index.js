import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Routes from '../../Helpers/Routes';

class App extends React.Component {
  render() {
    return (
      <ChakraProvider>
      <Flex justifyContent="center" alignItems="center">
        <Router>
          <Routes/>
        </Router>
      </Flex>
      </ChakraProvider>
    );
  }
}

export default App;
