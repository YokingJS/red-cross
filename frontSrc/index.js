
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './home/index';
import DonateDetail from './donate-detail/index';
import FillInfo from './fillInfo/index';
import DonateResult from './donatedResult/index';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter
        forceRefresh={false}
        keyLength={12}
      >
        <div>
          <Route path="/donateDetail" component={DonateDetail} />
          <Route path="/fillInfo" component={FillInfo} />
          <Route path="/donateResult" component={DonateResult} />
          <Route exact path="/" component={Home} />          
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





