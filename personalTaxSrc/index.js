
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import PersonalTax from './personalTax/index';
require('./index.scss');

class App extends React.Component {
  render() {
    return (
      <BrowserRouter
        forceRefresh={false}
        keyLength={12}
      >
        <div>
          <Route path="/goodgoods" component={PersonalTax} />
          <Route exact path="/" component={PersonalTax} />
          {/* <Route exact path="/" component={Home} />           */}
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





