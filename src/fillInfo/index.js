
import React from 'react';

import { Picker, List, InputItem } from 'antd-mobile';

import FootInfo from '../components/footInfo/index';
import request from '../components/request';

class FillInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      persionalOrCompany: 1,
      persionalOrCompanyArray: [{label: '个人', value: 1}, {label: '公司', value: 2}],
      name: '',
      mobile: '',
      money: '',
      isGetInvoice: 0,
      invoiceHeader: '',
      invoiceName: '',
      invoiceMobile: '',
      invoiceAddress: '',
      remark: '',
      isDisclosure: 0,
      weakerName: '',
      weakerId: ''
    };
    this.reRender = this.reRender.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);

    this.getPersionalOrCompanyLabel = this.getPersionalOrCompanyLabel.bind(this);
    this.onPickPersionalOrCompany = this.onPickPersionalOrCompany.bind(this);

    this.getInvoiceState = this.getInvoiceState.bind(this);
    this.onPickInvoice = this.onPickInvoice.bind(this);

    this.getPublicState = this.getPublicState.bind(this);
    this.onPickPublic = this.onPickPublic.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    let pageUrl = window.location.pathname || '';
    let paramArray = pageUrl.split('/');
    if (paramArray.length > 2) {
      this.state.weakerName = decodeURIComponent(paramArray[paramArray.length - 1]);
      this.state.weakerId = paramArray[paramArray.length - 2];
      this.reRender();
    } else {
      alert('捐赠信息丢失');
    }
  }

  reRender() {
    this.setState({
      ...this.state
    });
  }

  onPickPersionalOrCompany(value) {
    this.setState({
      persionalOrCompany: value[0] || 1
    });
  }

  getPersionalOrCompanyLabel() {
    let ret = '';
    const { persionalOrCompany = 1, persionalOrCompanyArray =[] } = this.state || {};
    persionalOrCompanyArray.forEach((item) => {
      if (item.value === persionalOrCompany) ret = item.label;
    });
    return ret;
  }

  getInvoiceState(array) {
    let ret = '';
    const { isGetInvoice = 0 } = this.state || {};
    array.forEach((item) => {
      if (item.value === isGetInvoice) ret = item.label;
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
        isGetInvoice: value[0] || 0
    });
  }

  onSubmit() {
    console.log(request.requestWechatCode());
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
          this.state.age = value;
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
      persionalOrCompany = 1, persionalOrCompanyArray =[], weakerName = '', name = '', mobile = '',
      money = '', invoiceHeader = '', invoiceName = '', invoiceMobile = '', invoiceAddress = '',
      remark = ''
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
              data={persionalOrCompanyArray}
              cols={1}
              extra={this.getPersionalOrCompanyLabel()}
              onChange={this.onPickPersionalOrCompany}
              onOk={this.onPickPersionalOrCompany}
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
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
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
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
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
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
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
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
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
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>捐助信息:</span>
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
    border: '1px solid #999999',
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