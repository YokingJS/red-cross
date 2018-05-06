

import React from 'react';
import FootInfo from '../components/footInfo/index';
import request from '../components/request';

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      baseModel: {}
    };
  }

  componentWillMount() {

    let params = this.getRequest();
    if(params.orderid) {
      request.getOrderById('?id=' + params.orderid).then(resS => {
        if(resS.errorMsg) {
          alert(resS.errorMsg);
          return;
        }
        let resData = resS.data || {};
        this.setState({
          baseModel: resData
        });
      });
    }
  }

  getRequest() {  
    let url = window.location.search; //获取url中"?"符后的字串  
    let theRequest = new Object();  
    let strs;
    if (url.indexOf("?") != -1) {  
       let str = url.substr(1);  
       strs = str.split("&");  
       for(var i = 0; i < strs.length; i ++) {  
          theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);  
       }  
    }  
    return theRequest;  
  }  

  render() {
    const baseModel = this.state.baseModel || {};
    const {
      appealRecordId = '', money = '', donateType = 0, gmtModify = ''
    } = baseModel;
    let appealRecordTitle = window.getCookie('jiushu_data_appealRecordTitle');
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
          <div style={{...styles.topLine, marginTop: '.45rem'}}/>
          <div style={{...styles.rowLine, marginTop: '.45rem'}}>
            <span style={styles.largeText}>订单号:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '.2rem'}}>{appealRecordId}</span>
          </div>
          <div style={{...styles.rowLine, marginTop: '.45rem'}}>
            <span style={styles.largeText}>捐赠项目:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '.2rem'}}>{appealRecordTitle}</span>
          </div>
          <div style={{...styles.rowLine, marginTop: '.45rem'}}>
            <span style={styles.largeText}>交易金额:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '.2rem'}}>{money / 100}</span>
          </div>
          <div style={{...styles.rowLine, marginTop: '.45rem'}}>
            <span style={styles.largeText}>捐助单位/个人:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '.2rem'}}>
              {donateType === 1 ? '个人' : '公司'}
            </span>
          </div>
          <div style={{...styles.rowLine, marginTop: '.45rem'}}>
            <span style={styles.largeText}>交易时间:</span>
            <span style={{...styles.largeText, ...styles.textOverflow, color: '#ff3333', marginLeft: '.2rem'}}>
              {(new Date(gmtModify)).toLocaleDateString()}
            </span>
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
    padding: '0 .4rem',
    lineHeight: '.45rem',
    fontSize: '.36rem',
    color: '#999999'
  },
  largeText: {
    lineHeight: '.8rem',
    fontSize: '.48rem',
    color: '#333333'
  },
  page: {
    padding: '.35rem .4rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5'
  },
  groupPhoto: {
    width: '100%',
    height: '6rem'
  },
  tanks: {
    lineHeight: '1rem',
    fontSize: '.8rem',
    marginTop: '.5rem',
    fontStyle: 'italic',
    color: '#333'
  },
  tanksDes: {
    lineHeight: '.8rem',
    fontSize: '.5rem',
    fontStyle: 'italic',
    color: '#666' 
  }
};