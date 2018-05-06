
import React from 'react';

import { Picker, List, InputItem } from 'antd-mobile';

import FootInfo from '../components/footInfo/index';
import request from '../components/request';

class FillInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      donateType: 1,
      donateTypeArray: [{label: '个人', value: 1}, {label: '公司', value: 2}],
      name: '',
      mobile: '',
      money: '',
      isNeedInvoice: 0,
      invoiceHeader: '',
      invoiceName: '',
      invoiceMobile: '',
      invoiceAddress: '',
      remark: '',
      isDisclosure: 0,
      weakerName: '',
      appealRecordId: '',
      openCode: ''
    };
    this.reRender = this.reRender.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);

    this.getDonateTypeLabel = this.getDonateTypeLabel.bind(this);
    this.onPickDonateType = this.onPickDonateType.bind(this);

    this.getInvoiceState = this.getInvoiceState.bind(this);
    this.onPickInvoice = this.onPickInvoice.bind(this);

    this.getPublicState = this.getPublicState.bind(this);
    this.onPickPublic = this.onPickPublic.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    let pathname = window.location.pathname || '';
    let pathSearch = decodeURI(window.location.search);
    let redirect_uri = 'http%3a%2f%2fpthh.svell.cn' + encodeURI(pathname + pathSearch);
    // let paramArray = pathname.split('/');
    let params = this.getRequest();
    if ((!params || !params.code) && this.isWeChat()) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85e543017679058f&redirect_uri='+ redirect_uri +'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
    } else if(params && params.code) {
      this.state.openCode = params.code;
    }
    let jiushu_data_id = window.getCookie('jiushu_data_id');
    let jiushu_data_name = window.getCookie('jiushu_data_name');
    
    if (jiushu_data_name && jiushu_data_id) {
      this.state.weakerName = jiushu_data_name;
      this.state.appealRecordId = jiushu_data_id;
      this.reRender();
    } else {
      alert('捐赠信息丢失');
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

  isWeChat() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  reRender() {
    this.setState({
      ...this.state
    });
  }

  onPickDonateType(value) {
    this.setState({
      donateType: value[0] || 1
    });
  }

  getDonateTypeLabel() {
    let ret = '';
    const { donateType = 1, donateTypeArray =[] } = this.state || {};
    donateTypeArray.forEach((item) => {
      if (item.value === donateType) ret = item.label;
    });
    return ret;
  }

  getInvoiceState(array) {
    let ret = '';
    const { isNeedInvoice = 0 } = this.state || {};
    array.forEach((item) => {
      if (item.value === isNeedInvoice) ret = item.label;
    });
    return ret;
  }

  getPublicState(array) {
    let ret = '';
    const { isDisclosure = 0 } = this.state || {};
    array.forEach((item) => {
      if (item.value === isDisclosure) ret = item.label;
    });
    return ret;
  }

  onPickPublic(value) {
    this.setState({
      isDisclosure: value[0] || 0
    });
  }

  onPickInvoice(value) {
    this.setState({
      isNeedInvoice: value[0] || 0
    });
  }

  onSubmit() {
    if (!this.isWeChat()) {
      alert('请在微信客户端打开');
      return;
    }
    const {
      name = '', appealRecordId = '', money = '', mobile = '', donateType = '', isNeedInvoice = '',
      invoiceHeader = '', invoiceName = '', invoiceMobile = '', invoiceAddress = '', remark = '',
      isDisclosure = 0, openCode = ''
    } = this.state || {};
    if (!name || !mobile || !appealRecordId || !money) {
      alert('缺少必要信息！');
      return;
    }
    if (isNeedInvoice && (!invoiceHeader || !invoiceName || !invoiceMobile || !invoiceAddress)) {
      alert('索要发票需填写发票信息！');
      return;
    }
    let appealRecordTitle = window.getCookie('jiushu_data_appealRecordTitle');

    request.unifiedOrder({
      name: name,
      appealRecordId: appealRecordId,
      money: money * 100,
      mobile: mobile,
      donateTime: new Date().getTime(),
      donateType: donateType,
      isNeedInvoice: isNeedInvoice,
      invoiceHeader: invoiceHeader,
      invoiceName: invoiceName,
      invoiceMobile: invoiceMobile,
      invoiceAddress: invoiceAddress,
      remark: remark,
      isDisclosure: isDisclosure,
      appealRecordTitle: appealRecordTitle,
      openId: openCode
    }).then(resS => {
      if (resS.errorMsg) {
        alert(resS.errorMsg);
        return;
      } 
      let resData = resS.data || {};
      let orderid = resData.orderId;
      request.getBrandWCPayRequest(resData, () => {
        setTimeout(() => {
          window.location.href = '//pthh.svell.cn/donateResult?orderid=' + orderid;
        }, 700);
      });
    }, resE => {
      alert('请刷新页面再试试吧~');
    }).catch(err => {
      alert('微信出错啦~' + err.message);
    });

  }

  onChangeInput(item) {
    let onChangeInput = (value) => {
      switch(item) {
        case 'name':
          this.state.name = value;
          break;
        case 'mobile':
          this.state.mobile = value;
          break;
        case 'money':
          this.state.money = value;
          break;
        case 'invoiceHeader':
          this.state.invoiceHeader = value;
          break;
        case 'invoiceName':
          this.state.invoiceName = value;
          break;
        case 'invoiceMobile':
          this.state.invoiceMobile = value;
          break;
        case 'invoiceAddress':
          this.state.disease = value;
          break;
        case 'remark':
          this.state.videoUrl = value;
          break;
        default: break;
      }
      this.setState({
        ...this.state
      });
    };

    return onChangeInput;

  }

  renderButton() {
    return (
      <div style={styles.fixedButton}>
        <div style={styles.helpButton} onClick={this.onSubmit}>爱心提交</div>
      </div>
    );
  }

  render() {
    const {
      donateType = 1, donateTypeArray =[], weakerName = '', name = '', mobile = '',
      money = '', invoiceHeader = '', invoiceName = '', invoiceMobile = '', invoiceAddress = '',
      remark = '', isNeedInvoice = 0
    } = this.state || {};
    return (
      <div style={styles.fillInfo}>
        <div style={{...styles.rowLine, padding: '8rem 4rem'}}>
          <img
            src="https://gw.alicdn.com/tfs/TB1usd5o_tYBeNjy1XdXXXXyVXa-89-87.png"
            alt=""
            style={styles.noticeImg}
          />
          <span style={{...styles.largeText, color: '#ff3322', marginLeft: '2rem'}}>感谢您的爱心支持，请填写以下捐赠信息</span>
        </div>
        <div style={styles.rowLine}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>捐赠时间:</span>
          <span style={{...styles.largeText, ...styles.boxNoBorder, ...styles.textOverflow}}>{(new Date()).toLocaleDateString()}</span>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>捐赠意向:</span>
          <span style={{...styles.largeText, ...styles.boxNoBorder, ...styles.textOverflow}}>{weakerName}</span>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>所属:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <Picker
              data={donateTypeArray}
              cols={1}
              extra={this.getDonateTypeLabel()}
              onChange={this.onPickDonateType}
              onOk={this.onPickDonateType}
              className="forss"
            >
              <List.Item arrow="down"></List.Item>
            </Picker>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>姓名/名称:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
                clear
                placeholder="请输入名字"
                value={name}
                onChange={this.onChangeInput('name')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>手机号:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
                clear
                placeholder="请输入手机号"
                value={mobile}
                onChange={this.onChangeInput('mobile')}
                type="phone"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>币种:</span>
          <span style={{...styles.largeText, ...styles.boxNoBorder, ...styles.textOverflow}}>人民币</span>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>金额(元):</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
                clear
                placeholder="请输入金额"
                value={money}
                onChange={this.onChangeInput('money')}
                type="money"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>开具发票:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <Picker
              data={[{label: '是', value: 1}, {label: '否', value: 0}]}
              cols={1}
              extra={this.getInvoiceState([{label: '是', value: 1}, {label: '否', value: 0}])}
              onChange={this.onPickInvoice}
              onOk={this.onPickInvoice}
              className="forss"
            >
              <List.Item arrow="down"></List.Item>
            </Picker>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: isNeedInvoice ? '#ff3322' : 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>抬头:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请输入发票抬头"
              value={invoiceHeader}
              onChange={this.onChangeInput('invoiceHeader')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: isNeedInvoice ? '#ff3322' : 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>联系人:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请填写联系人"
              value={invoiceName}
              onChange={this.onChangeInput('invoiceName')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: isNeedInvoice ? '#ff3322' : 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>联系电话:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请输入手机号"
              value={invoiceMobile}
              onChange={this.onChangeInput('invoiceMobile')}
              type="phone"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: isNeedInvoice ? '#ff3322' : 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>邮件地址:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请填写邮件地址"
              value={invoiceAddress}
              onChange={this.onChangeInput('invoiceAddress')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>邮编:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请输入邮编"
              type="number"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>备注:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder=""
              value={remark}
              onChange={this.onChangeInput('remark')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>是否公开:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <Picker
              data={[{label: '公开', value: 1}, {label: '不公开', value: 0}]}
              cols={1}
              extra={this.getPublicState([{label: '公开', value: 1}, {label: '不公开', value: 0}])}
              onChange={this.onPickPublic}
              onOk={this.onPickPublic}
              className="forss"
            >
              <List.Item arrow="down"></List.Item>
            </Picker>
          </div>
        </div>
        <FootInfo />
        {this.renderButton()}
        <div style={{height: '19rem'}}/>
      </div>
    );
  }
}

export default FillInfo;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  fillInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  rowLine: {
    flex: 1,
    height: '10rem',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 4rem',
    alignItems: 'center'
  },
  boxWithBorder: {
    marginLeft: '2rem',
    border: '1px solid #999',
    borderRadius: '1rem',
    height: '10rem',
    flex: 1,
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center'
  },
  boxNoBorder: {
    marginLeft: '2rem',
    height: '10rem',
    flex: 1,
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center'
  },
  largeText: {
    lineHeight: '5rem',
    fontSize: '4.8rem',
    color: '#666666'
  },
  noticeImg: {
    width: '5rem',
    height: '5rem'
  },
  fixedButton: {
    position: 'fixed',
    width: '108rem',
    padding: '0rem 4rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '16rem',
    left: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5'
  },
  helpButton: {
    width: '90rem',
    height: '12rem',
    lineHeight: '12rem',
    fontSize: '6rem',
    color: '#fff',
    backgroundColor: '#fd6463',
    textAlign: 'center',
    borderRadius: '6rem'
  }
};