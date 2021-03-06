

import React from 'react';
import FootInfo from '../components/footInfo/index';
import {Link} from 'react-router-dom';
import request from '../components/request';

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      baseModel: {},
      donateInfoList: [],
      isFromSearch: false
    };
    this.renderDataList = this.renderDataList.bind(this);
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
          isFromSearch: false,
          baseModel: resData
        });
      });
    } else {
      let search_name = window.getCookie('jiushu_data_searchname');
      let search_mobile = window.getCookie('jiushu_data_searchmobile');
      request.getOrderByCondition('?name=' + search_name + '&mobile=' + search_mobile).then(resS => {
        if (!resS.errorMsg) {
          if(resS.data && resS.data.length > 0) {
            this.setState({
              isFromSearch: true,
              donateInfoList: resS.data || []
            });
          } else {
            Toast.info('查无信息~', 1.5);
          }
          
        }
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

  renderDataList() {
    const { baseModel = {}, donateInfoList = [], isFromSearch = false} = this.state || {}; 
    let dataList = isFromSearch ? donateInfoList : [].concat(baseModel);

    if (!dataList || dataList === 'null' || dataList === 'undefined') dataList = [];
    let alternativeTitle = '';
    if (!isFromSearch) {
      alternativeTitle = window.getCookie('jiushu_data_name');
    }
    return dataList.map((item, index) => {
      const {
        appealRecordId = '', money = '', donateType = 0, gmtModify = '', appealRecordTitle = '', name = ''
      } = item;
      return [
        <div style={{...styles.topLine, marginTop: '.45rem'}}/>,
        <div key={index + '001'} style={{...styles.rowLine, marginTop: '.45rem'}}>
          <span style={styles.largeText}>订单号:</span>
          <span style={{...styles.largeText, ...styles.textOverflow, color: '#333', marginLeft: '.2rem'}}>{appealRecordId}</span>
        </div>,
        <div key={index + '002'} style={{...styles.rowLine, marginTop: '.1rem'}}>
          <span style={styles.largeText}>捐赠项目:</span>
          <span style={{...styles.largeText, ...styles.textOverflow, color: '#333', marginLeft: '.2rem'}}>{appealRecordTitle || alternativeTitle}</span>
        </div>,
        <div key={index + '003'} style={{...styles.rowLine, marginTop: '.1rem'}}>
          <span style={styles.largeText}>交易金额:</span>
          <span style={{...styles.largeText, ...styles.textOverflow, color: '#333', marginLeft: '.2rem'}}>{money / 100}</span>
        </div>,
        <div key={index + '004'} style={{...styles.rowLine, marginTop: '.1rem'}}>
          <span style={styles.largeText}>捐助单位/个人:</span>
          <span style={{...styles.largeText, ...styles.textOverflow, color: '#333', marginLeft: '.2rem'}}>
            {/* {donateType === 1 ? '个人' : '公司'} */}
            {name}
          </span>
        </div>,
        <div key={index + '005'} style={{...styles.rowLine, marginTop: '.1rem'}}>
          <span style={styles.largeText}>交易时间:</span>
          <span style={{...styles.largeText, ...styles.textOverflow, color: '#333', marginLeft: '.2rem'}}>
            {(new Date(gmtModify)).toLocaleDateString()}
          </span>
        </div>,
        index === dataList.length - 1 ? <Link
        to={'/'}
        style={{...styles.helpButton, backgroundColor: '#ff3332'}}
      >去首页</Link> : null
      ];
    });
  }

  render() {
    const { baseModel = {}, donateInfoList = [], isFromSearch = false} = this.state || {};
    return (
      <div style={styles.page}>
        <div style={{padding: '.4rem', backgroundColor: '#fff', display: 'flex', flexDirection: 'column'}}>
          <img
            src="https://gw.alicdn.com/tfs/TB1REj5yntYBeNjy1XdXXXXyVXa-1080-685.jpg"
            alt=""
            style={styles.groupPhoto}
          />
          <span style={styles.tanks}>感谢您</span>
          <span style={styles.tanksDes}>弹指之间，小善念汇聚大能量！</span>
          <span style={styles.tanksDes}>THANKS！</span>
          {this.renderDataList()}
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
    color: '#ff3333',
    fontWeight: '300'
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
    fontWeight: '300',
    color: '#111'
  },
  tanksDes: {
    lineHeight: '.8rem',
    fontSize: '.5rem',
    fontStyle: 'italic',
    fontWeight: '300',
    color: '#333' 
  },
  helpButton: {
    width: '6rem',
    height: '0.8rem',
    marginTop: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',    
    lineHeight: '0.8rem',
    fontSize: '.4rem',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '.4rem'
  }
};