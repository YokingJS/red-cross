
import React from 'react';
import { InputItem, ImagePicker, TextareaItem, Toast, Modal, Button, Picker, List } from 'antd-mobile';
import request from '../../components/request';

const MARGINTOP = '10px';
const TITLEWIDTH = '100px';
let appealProjectList = [];
const getAppealProjectList = (array) => {
  if (array && array.length) {
    return array.map(item => ({
      value: item.id,
      label: `${item.name && item.name + ':'}${item.title}`
    }));
  } else return []
};
const getAppealProjectListLabel = (value) => {
  let ret = '';
  appealProjectList.forEach((item) => {
    if (item.value === value) ret = item.label;
  });
  return ret;
};

const getAppealRecordTitle = (id) => {
  let ret = ''
  appealProjectList.forEach(item => {
    if (item.value === id) {
      ret = ((item.label || '').split(':') || [])[0];
    }
  });
  return ret;
};

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputDonatorVisible: false,
      appealRecordId: '',
      name: '',
      mobile: '',
      money: 0,
      remark: '',
      isNeedInvoice: '否',
      gmtModify: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputDonator = this.onInputDonator.bind(this);
    this.onCloseInput = this.onCloseInput.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onInputDonator() {
    this.setState({
      inputDonatorVisible: true
    });
  }

  onCloseInput() {
    this.setState({
      inputDonatorVisible: false
    });
  }

  onChangeInput(item) {
    let onChangeInput = (value) => {
      switch(item) {
        case 'appealRecordId':
          this.state.appealRecordId = value && value[0] || 0;
          break;
        case 'name':
          this.state.name = value;
          break;
        case 'mobile':
          this.state.mobile = value;
          break;
        case 'money':
          this.state.money = value;
          break;
        case 'remark':
          this.state.remark = value;
          break;
        case 'isNeedInvoice':
          this.state.isNeedInvoice = value;
          break;
        case 'gmtModify':
          this.state.gmtModify = value;
          break;

        default: break;
      }
      this.setState({
        ...this.state
      });
    };

    return onChangeInput;

  }

  onSubmit() {
    const {
      appealRecordId = '', name = '', mobile = '', money = 0, remark = '', isNeedInvoice = '否', gmtModify = ''
    } = this.state;
    let gmtModifyDate = new Date(gmtModify).getTime();
    let appealRecordTitle = getAppealRecordTitle(appealRecordId);

    if (appealRecordId && name && mobile && gmtModifyDate) {

      request.insertOrderRecord({
        name, appealRecordId, mobile, appealRecordTitle, gmtModify: gmtModifyDate,
        money: money * 100,
        isPaySuccess: 1
      }).then(resS => {
        if (resS.errorMsg) {
          Toast.fail(resS.errorMsg, 1.5);
        } else {
          Toast.success('新增成功~', 1.5);
          setTimeout(() => {location.reload()}, 1500);
        }
      });
    } else {
      Toast.fail(gmtModifyDate ? '缺少必填项~' : '时间没有正确填写', 1.5);
    }
  }
  
  render() {
    const {
      inputDonatorVisible = false, appealRecordId = '', name = '', mobile = '', money = 0, remark = '', isNeedInvoice = '否', gmtModify = ''
    } = this.state;
    appealProjectList = getAppealProjectList(this.props.weakerData || []);

    return (
      <div>
        <Button onClick={this.onInputDonator} style={styles.addDonator}>新增捐助信息</Button>
        <Modal
          title="新增捐助信息"
          transparent
          maskClosable={false}
          visible={this.state.inputDonatorVisible}
          onClose={this.onCloseInput}
          style={styles.modal}
          footer={[
            { text: '确定', onPress: () => { this.onSubmit(); } },
            { text: '取消', onPress: () => { this.onCloseInput(); } }
          ]}
        >
          <div style={styles.fillInfo}>
            <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
              <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
              <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐助项目:</span>
              <div style={styles.boxWithBorder} className="pickerBox">
                <Picker
                  data={appealProjectList}
                  cols={1}
                  extra={getAppealProjectListLabel(appealRecordId)}
                  onChange={this.onChangeInput('appealRecordId')}
                  onOk={this.onChangeInput('appealRecordId')}
                  className="forss"
                >
                  <List.Item arrow="down" />
                </Picker>
              </div>
            </div>

            <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
              <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
              <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>姓名/公司:</span>
              <div style={styles.boxWithBorder} className="pickerBox">
                <InputItem
                  clear
                  value={name}
                  onChange={this.onChangeInput('name')}
                />
              </div>
            </div>

            <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
              <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
              <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐助人电话:</span>
              <div style={styles.boxWithBorder} className="pickerBox">
                <InputItem
                  clear
                  value={mobile}
                  onChange={this.onChangeInput('mobile')}
                />
              </div>
            </div>

            <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
              <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
              <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐助金额:</span>
              <div style={styles.boxWithBorder} className="pickerBox">
                <InputItem
                  clear
                  value={money}
                  onChange={this.onChangeInput('money')}
                />
              </div>
            </div>

            {/* <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
                <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
                <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>是否需要发票:</span>
                <div style={styles.boxWithBorder} className="pickerBox">
                  <InputItem
                    clear
                    placeholder="是/否"
                    value={
                      (() => {
                        if (isNeedInvoice === 0) return '否';
                        else if (isNeedInvoice === 1) return '是';
                        else return isNeedInvoice;
                      })()
                    }
                    onChange={this.onChangeInput('isNeedInvoice')}
                  />
                </div>
            </div> */}

            <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
              <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
              <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐助时间:</span>
              <div style={styles.boxWithBorder} className="pickerBox">
                <InputItem
                  clear
                  placeholder="1900/01/01"
                  value={gmtModify}
                  onChange={this.onChangeInput('gmtModify')}
                />
              </div>
            </div>

            {/* <div style={{...styles.rowLine, marginTop: MARGINTOP, height: 'auto'}}>
              <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>备注:</span>
              <div style={{...styles.boxWithBorder, height: 'auto'}} className="pickerBox">
                <TextareaItem
                  clear
                  placeholder="支持回车换行"
                  value={remark}
                  rows={5}
                  onChange={this.onChangeInput('remark')}
                />
              </div>
            </div> */}
        </div>
        </Modal>
        </div>
    );
  }
}

export default Page;

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
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 5px',
    alignItems: 'center'
  },
  addDonator: {
    width: '150px',
    color: '#fff',
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '30px',
    lineHeight: '30px',
    textAlign: 'left',
    marginLeft: '30px',
    backgroundColor: '#ff3323'
  },
  boxWithBorder: {
    marginLeft: '5px',
    border: '1px solid #999999',
    borderRadius: '4px',
    height: '40px',
    flex: 1,
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center'
  },
  boxNoBorder: {
    marginLeft: '5px',
    height: '40px',
    flex: 1,
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center'
  },
  largeText: {
    lineHeight: '50px',
    fontSize: '12px',
    color: '#666666'
  },
  oldImage: {
    width: '108px',
    height: '50px',
    borderRadius: '5px',
    marginRight: '10px',
    backgroundColor: '#eee'
  },
  fixedButton: {
    position: 'fixed',
    width: '100%',
    padding: '0rem 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  helpButton: {
    width: '200px',
    height: '60px',
    lineHeight: '60px',
    fontSize: '20px',
    color: '#fff',
    backgroundColor: '#fd6463',
    textAlign: 'center',
    borderRadius: '6px'
  },
  modal: {
    width: '500px'
  }
};