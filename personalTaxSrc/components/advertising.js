import React from 'react';
import { Layout, Carousel } from 'antd';

const Sider = Layout.Sider;
const NOOP = () => {};

class Advertising extends React.Component {
  render() {
    return (
      <Sider style={styles.sider} width="300">
        <div style={styles.advertising}>
          <div style={styles.carouselBox}>
            <Carousel vertical autoplay afterChange={NOOP}>
              <div><img style={styles.carouselImg} src="https://img.alicdn.com/tfs/TB1uD9UtYGYBuNjy0FoXXciBFXa-324-324.png" /></div>
              <div><img style={styles.carouselImg} src="https://img.alicdn.com/tfs/TB1mkn7pntYBeNjy1XdXXXXyVXa-1080-500.jpg" /></div>
              <div><img style={styles.carouselImg} src="https://img.alicdn.com/tfs/TB1JPTXoFuWBuNjSspnXXX1NVXa-702-360.png" /></div>
            </Carousel>
          </div>
          <div style={styles.contactUs}>
            <span style={styles.contactUsText}>联系我们</span>
            <img style={styles.contactUsImg} src="https://img.alicdn.com/tfs/TB1th0TDCzqK1RjSZFpXXakSXXa-674-686.png" />          
          </div>
        </div>
      </Sider>
    )
  }
}

export default Advertising;

const styles = {
  sider: {
    backgroundColor: '#fff'
  },
  advertising: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contactUs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px'
  },
  contactUsText: {
    color: '#666',
    fontSize: '16px',
    lineHeight: '40px'
  },
  carouselBox: {
    width: '200px',
    marginTop: '20px'
  },
  carouselImg: {
    width: '200px',
    height: '600px'
  },
  contactUsImg: {
    width: '150px',
    height: '150px'
  }
};