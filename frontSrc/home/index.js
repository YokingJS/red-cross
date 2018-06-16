

import React from 'react';

import Banner from './components/banner/index';
import NavigatorButton from './components/navigatorButton/index';
import SerarchArea from './components/serarchArea/index'
import Donors from './components/donors/index';
import FootInfo from '../components/footInfo/index';
import request from '../components/request';

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
    this.state = {
      baseModel: {}
    };
    this.reRender = this.reRender.bind(this);
  }

  reRender() {
    const { baseModel = {} } = this.state || {};
    this.setState({
      baseModel: baseModel
    });
  }

  componentWillMount() {
    request.getInitInformation().then(res => {
      if(!res.errorMsg) {
        this.state.baseModel = res.data || {};
      }
      this.reRender();
    });
  }

  render() {
    const { baseModel = {} } = this.state || {};
    return (
      <div style={styles.page}>
        <Banner
          bannerList={baseModel.urlList || []}
        />
        <NavigatorButton />
        <SerarchArea />
        <Donors
          data={baseModel.appealRecordList || []}
        />
        <FootInfo />
      </div>
    );
  }
}

export default Page;





