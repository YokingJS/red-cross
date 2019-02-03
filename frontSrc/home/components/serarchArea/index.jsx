
import React from 'react';
import { TextareaItem, Toast } from 'antd-mobile';
let Modal = require('antd-mobile/lib/Modal');
require('antd-mobile/lib/Modal/style');
import {withRouter} from "react-router-dom";
import request from '../../../components/request';

class SearchArea extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isShowModal: false,
      donateInfoList: []
    };

    this.reRender = this.reRender.bind(this);
    this.onSearchDonate = this.onSearchDonate.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.renderDonateInfoList = this.renderDonateInfoList.bind(this);
  }

  reRender() {
    this.setState({
      ...(this.state || {})
    });
  }

  onSearchDonate() {
    let value = ((this.refs.search || {}).state || {}).value || '';
    if (!value) return;
    value = value.replace(/\s+/g,"");
    let name = value.substring(0, value.length - 4);
    let mobile = value.substring(value.length - 4, value.length);
    request.getOrderByCondition('?name=' + name + '&mobile=' + mobile).then(resS => {
      if (!resS.errorMsg) {
        if(resS.data && resS.data.length > 0) {      
          window.setCookie('jiushu_data_searchname', name);
          window.setCookie('jiushu_data_searchmobile', mobile);
          this.props.history.push('/donateResult');
        } else {
          Toast.info('查无信息~', 1.5);
        }
        
      }
    });
  }

  onCloseModal() {
    this.state.isShowModal = false;
    this.reRender();
  }

  onShowModal() {
    this.state.isShowModal = true;
    this.reRender();
  }

  renderDonateInfoList() {
    const { donateInfoList = [] } = this.state || {};
    let retHtml = donateInfoList.map((item, index) => {
      const {
        name = '', money = '', mobile = '', gmtModify = ''
      } = item;
      return (
        <div key={index}>
          <div style={styles.modalContext} >姓名：{name}</div>
          <div style={styles.modalContext} >金额：{money / 100}</div>
          <div style={styles.modalContext} >手机：{mobile}</div>
          <div style={styles.modalContext} >最后捐助时间：{(new Date(gmtModify)).toLocaleDateString()}</div>
        </div>
      );
    });
    return retHtml;
  }

  render() {
    const { isShowModal = false } = this.state || {};
    return (
      <div style={styles.searchArea}>
        <span style={{...styles.searchTitle, ...styles.textOverflow}}>捐款查询平台</span>
        <div style={styles.inputBox}>
          <TextareaItem
            placeholder="单位查询直接输入名称，个人查询请输入姓名+手机号后四位，如韩星0000"
            data-seed="logId"
            autoHeight
            ref="search"
            style={{paddingRight: '0rem'}}
          />
          <img
            src="https://gw.alicdn.com/tfs/TB1I17srntYBeNjy1XdXXXXyVXa-130-69.png"
            alt=""
            style={styles.searchButton}
            onClick={this.onSearchDonate}
          />
        </div>
        {/* <Modal
          visible={isShowModal}
          transparent
          maskClosable={true}
          onClose={this.onCloseModal}
          footer={[{ text: 'Ok', onPress: () => { this.onCloseModal() } }]}
          key={2}
        >
          <div style={styles.modalContent}>
            <span style={styles.modalTitle}>捐款信息</span>
            {this.renderDonateInfoList()}
          </div>
        </Modal>  */}
      </div>
    );
  }

}

export default withRouter(SearchArea);

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  searchArea: {
    display: 'flex',
    marginTop: '.25rem',
    height: '1.8rem',
    padding: '.4rem',
    backgroundColor: '#ffffff'
  },
  searchTitle: {
    width: '3.2rem',
    height: '1rem',
    paddingTop: '.1rem',
    lineHeight: '.8rem',
    fontSize: '.52rem',
    color: '#333333'
  },
  inputBox: {
    flex: 1,
    height: '1rem',
    marginLeft: '.4rem',
    border: '1px solid #999999',
    borderRadius: '.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchButton: {
    width: '1.2rem',
    height: '.8rem',
    marginRight: '.05rem'
  },
  modalContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '3rem',
    overflow: 'scroll'
  },
  modalTitle: {
    height: '.8rem',
    textAlign: 'left',
    fontSize: '.5rem',
    color: '#333333',
    lineHeight: '.8rem'
  },
  modalContext: {
    width: '9rem',
    maxHeight: '8rem',
    textAlign: 'left',
    fontSize: '.36rem',
    color: '#666666',
    lineHeight: '.45rem',
    wordBreak: 'break-all'
  }
};