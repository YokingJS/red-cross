
import React from 'react';
import ButtomItem from '../buttomItem/index';

class NavigatorButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div style={styles.navigator}>
        <div style={styles.projectTitle}>
          <img
            src={'https://gw.alicdn.com/tfs/TB1usd5o_tYBeNjy1XdXXXXyVXa-89-87.png'}
            alt=""
            style={styles.redCrossLogo}
          />
          <span style={{...styles.projectName, ...styles.textOverflow}}>“同心博爱” 百姓公益救助项目</span>
        </div>
        <div style={styles.buttonBox}>
          <ButtomItem
            title={'关于我们'}
            buttonUrl={'https://gw.alicdn.com/tfs/TB1g._NoHGYBuNjy0FoXXciBFXa-128-128.png'}
          />
          <ButtomItem
            title={'项目介绍'}
            buttonUrl={'https://gw.alicdn.com/tfs/TB1uSgvoKuSBuNjy1XcXXcYjFXa-128-128.png'}
          />
          <ButtomItem
            title={'申请对象'}
            buttonUrl={'https://gw.alicdn.com/tfs/TB1ACovoKuSBuNjy1XcXXcYjFXa-128-128.png'}
          />
          <ButtomItem
            title={'救助流程'}
            buttonUrl={'https://gw.alicdn.com/tfs/TB1_MMSoGmWBuNjy1XaXXXCbXXa-128-128.png'}
          />
        </div>
      </div>
    );
  }
}

export default NavigatorButton;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  navigator: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '35rem',
    padding: '3rem 0rem',
    backgroundImage: 'linear-gradient(to bottom, #E0FAE4, #FFFFFF)',
  },
  projectTitle: {
    display: 'flex',
    padding: '0 4rem'
  },
  projectName: {
    width: '80rem',
    height: '6rem',
    marginLeft: '2rem',
    lineHeight: '5.6rem',
    paddingTop: '0.2rem',
    fontSize: '5.2rem',
    color: '#009966'
  },
  redCrossLogo: {
    width: '6rem',
    height: '6rem'
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  }
};