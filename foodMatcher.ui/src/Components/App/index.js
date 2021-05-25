import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../../Helpers/Routes';

class App extends React.Component {
  render() {
    return (
      <div className="App d-flex justify-content-center">
        <Router>
          <Routes/>
        </Router>
      </div>
    );
  }
}

export default App;
