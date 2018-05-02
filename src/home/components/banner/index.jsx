

import React from 'react';
import { Carousel } from 'antd-mobile';

class Banner extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state={
      bannerList: [
        '',
        ''
      ]
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      bannerList: nextProps.bannerList || []
    });
  }

  render() {
    const { bannerList = [] } = this.state || {};
    return (
      <Carousel
          autoplay={true}
          infinite={true}
        >
          {bannerList.map((item, index) => (
            <img
              key={index}
              src={item}
              alt=""
              style={styles.bannerSize}
            />
          ))}
        </Carousel>
    );
  }
}

export default Banner;

const styles = {
  bannerSize: {
    width: '100%',
    height: '50rem'
  }
};