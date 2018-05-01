'use strict';

import React from 'react';

import Banner from './components/banner/index';
import NavigatorButton from './components/navigatorButton/index';
import SerarchArea from './components/serarchArea/index'
import Donors from './components/donors/index';
import FootInfo from '../components/footInfo/index';

const styles = {
  page: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5'
  }
};

class Page extends React.Component{
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div style={styles.page}>
        <Banner style={{width: '100%'}}/>
        <NavigatorButton />
        <SerarchArea />
        <Donors />
        <FootInfo />
      </div>
    );
  }
}

export default Page;





