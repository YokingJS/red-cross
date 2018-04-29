

import React from 'react';
import { Carousel } from 'antd-mobile';

class Banner extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state={
      bannerList: [
        'https://gw.alicdn.com/tfs/TB1JPTXoFuWBuNjSspnXXX1NVXa-702-360.png',
        'https://gw.alicdn.com/tfs/TB1JPTXoFuWBuNjSspnXXX1NVXa-702-360.png',
        'https://gw.alicdn.com/tfs/TB1JPTXoFuWBuNjSspnXXX1NVXa-702-360.png',
        'https://gw.alicdn.com/tfs/TB1JPTXoFuWBuNjSspnXXX1NVXa-702-360.png',
        'https://gw.alicdn.com/tfs/TB1JPTXoFuWBuNjSspnXXX1NVXa-702-360.png'
      ]
    };
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
