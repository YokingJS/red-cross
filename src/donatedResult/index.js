

import React from 'react';
import FootInfo from '../components/footInfo/index';

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div style={styles.page}>
        <div style={{padding: '4rem', backgroundColor: '#fff', display: 'flex', flexDirection: 'column'}}>
          <img
            src="https://gw.alicdn.com/tfs/TB1mkn7pntYBeNjy1XdXXXXyVXa-1080-500.jpg"
            alt=""
            style={styles.groupPhoto}
          />
          <span style={styles.tanks}>感谢您</span>
          <span style={styles.tanksDes}>弹指之间，小善念汇聚大能量！</span>
          <span style={styles.tanksDes}>THANKS！</span>
          <div style={{...styles.topLine, marginTop: '4.5rem'}}/>
          <div style={{...styles.rowLine, marginTop: '4.5rem'}}>
            <span style={styles.largeText}>订单号:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>13333333</span>
          </div>
          <div style={{...styles.rowLine, marginTop: '4.5rem'}}>
            <span style={styles.largeText}>捐赠项目:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>13333333</span>
          </div>
          <div style={{...styles.rowLine, marginTop: '4.5rem'}}>
            <span style={styles.largeText}>交易金额:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>13333333</span>
          </div>
          <div style={{...styles.rowLine, marginTop: '4.5rem'}}>
            <span style={styles.largeText}>捐助单位/个人:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>13333333</span>
          </div>
          <div style={{...styles.rowLine, marginTop: '4.5rem'}}>
            <span style={styles.largeText}>交易时间:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>13333333</span>
          </div>
        </div>
        <FootInfo backgroundColor={'transparent'}/>
      </div>
    );
  }
}

export default Page;

const styles = {
  topLine: {
    width: '100%',
    height: 0,
    borderTop: '1px solid #999'
  },
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  rowLine: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  normalText: {
    flex: 1,
    padding: '0 4rem',
    lineHeight: '4.5rem',
    fontSize: '3.6rem',
    color: '#999999'
  },
  largeText: {
    lineHeight: '8rem',
    fontSize: '4.8rem',
    color: '#333333'
  },
  page: {
    padding: '3.5rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5'
  },
  groupPhoto: {
    width: '100%',
    height: '60rem'
  },
  tanks: {
    lineHeight: '10rem',
    fontSize: '8rem',
    marginTop: '5rem',
    fontStyle: 'italic',
    color: '#333'
  },
  tanksDes: {
    lineHeight: '8rem',
    fontSize: '5rem',
    fontStyle: 'italic',
    color: '#666' 
  }
};