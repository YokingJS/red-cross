
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import FollowUp from './components/follow-up/index.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter
        forceRefresh={false}
        keyLength={12}
      >
        <div>
          <Route exact path="/" component={FollowUp} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





