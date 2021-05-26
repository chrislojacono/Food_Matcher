import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Routes from '../../Helpers/Routes';

class App extends React.Component {
  render() {
    return (
      <ChakraProvider>
      <div className="App d-flex justify-content-center">
        <Router>
          <Routes/>
        </Router>
      </div>
      </ChakraProvider>
    );
  }
}

export default App;
