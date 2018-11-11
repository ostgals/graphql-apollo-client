import React, { Component } from 'react';

import Profile from './Profile';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>GitHub GraphQL Client (powered by Apollo)</h1>
        </header>

        <Profile />
      </div>
    );
  }
}

export default App;
