
import React from 'react';
import {Link} from 'react-router-dom';

class DonorItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Link style={styles.donorItem} to={'/donateDetail/' + '4533555'}>
        <div style={styles.redCrossInfo}>
          <img
            src="https://gw.alicdn.com/tfs/TB1usd5o_tYBeNjy1XdXXXXyVXa-89-87.png"
            alt=""
            style={styles.redCrossLogo}
          />
          <span style={{...styles.redCrossName, ...styles.textOverflow}}>普陀区红十字会</span>
          <span style={{
            ...styles.redCrossName,
            ...styles.textOverflow,
            textAlign: 'right'
          }}>已结束</span>
        </div>
        <span style={{...styles.helpBrief, ...styles.textOverflow}}>肺癌引发多种疾病，生活拮据需要社会帮助帮助帮助</span>
        <span style={styles.donorCondition}>肺癌引发多种肺社会帮助帮助帮助肺癌引发多要社会帮助帮助帮助肺癌引发多种疾病，生活拮据需要社会帮助帮助帮助</span>
        <img
          src="https://gw.alicdn.com/tfs/TB1Bc4qmxGYBuNjy0FnXXX5lpXa-1500-480.png"
          alt=""
          style={styles.donorPhoto}
        />
        <div style={styles.donorInfo}>
          <span style={{...styles.donorInfoText, maxWidth: '40rem'}}>姓名: 赵晶晶</span>
          <span style={{...styles.donorInfoText, maxWidth: '30rem'}}>性别: 女</span>
          <span style={{...styles.donorInfoText, maxWidth: '30rem'}}>年龄: 45岁</span>
        </div>
        <div style={styles.donorInfo}>
          <span style={{...styles.donorInfoText, maxWidth: '80rem'}}>病种: 恶性肿瘤</span>
        </div>
        <div style={{...styles.donateInfo, padding: '0 4rem'}}>
          <div style={styles.donateInfoItem}>
            <img
              src="https://gw.alicdn.com/tfs/TB1Iy7ZoKuSBuNjy1XcXXcYjFXa-40-50.png"
              alt=""
              style={styles.donateInfoIcon}
            />
            <span style={styles.donateInfoItemText}>
              目标<span style={styles.donateInfoBlueText}>20000</span>元
            </span>
          </div>
          <div style={styles.donateInfoItem}>
            <img
              src="https://gw.alicdn.com/tfs/TB14c9Uo_tYBeNjy1XdXXXXyVXa-40-50.png"
              alt=""
              style={styles.donateInfoIcon}
            />
            <span style={styles.donateInfoItemText}>
              已筹<span style={styles.donateInfoBlueText}>20000</span>元
            </span>
          </div>
          <div style={styles.donateInfoItem}>
            <img
              src="https://gw.alicdn.com/tfs/TB11zgZoKuSBuNjy1XcXXcYjFXa-50-40.png"
              alt=""
              style={styles.donateInfoIcon2}
            />
            <span style={{...styles.donateInfoItemText, ...styles.textOverflow}}>
              捐款人数<span style={styles.donateInfoBlueText}>20000</span>人
            </span>
          </div>
        </div>
      </Link>
    );
  }
}

export default DonorItem;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  donorItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  redCrossInfo: {
    padding: '0 4rem',
    height: '14rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  redCrossLogo: {
    width: '5rem',
    height: '5rem'
  },
  redCrossName: {
    flex: 1,
    height: '5rem',
    marginLeft: '3rem',
    lineHeight: '4.2rem',
    paddingTop: '0.4rem',
    fontSize: '3.6rem',
    color: '#999999'
  },
  helpBrief: {
    flex: 1,
    height: '9rem',
    padding: '0.4rem 4rem',
    lineHeight: '8.2rem',
    fontSize: '5rem',
    color: '#009966'
  },
  donorCondition: {
    flex: 1,
    padding: '0 4rem',
    marginTop: '1rem',
    lineHeight: '4.5rem',
    fontSize: '3.6rem',
    color: '#999999'
  },
  donorPhoto: {
    margin: '0 4rem',
    flex: 1,
    height: '50rem',
    marginTop: '4.5rem'
  },
  donorInfo: {
    flex: 1,
    marginTop: '4.5rem',
    padding: '0 4rem',
    display: 'flex',
    flexDirection: 'row'
  },
  donorInfoText: {
    height: '6rem',
    paddingRight: '4rem',
    lineHeight: '6rem',
    fontSize: '4.8rem',
    color: '#333333',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  donateInfo: {
    marginTop: '4.5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5'
  },
  donateInfoItem: {
    flex: 1,
    height: '9rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  donateInfoIcon: {
    width: '4rem',
    height: '5rem'
  },
  donateInfoIcon2: {
    width: '5rem',
    height: '4rem'
  },
  donateInfoItemText: {
    flex: 1,
    marginLeft: '1rem',
    lineHeight: '8rem',
    fontSize: '3.6rem',
    color: '#333333'
  },
  donateInfoBlueText: {
    maxWidth: '3rem',
    lineHeight: '8rem',
    fontSize: '3.6rem',
    color: '#009966'
  }
};