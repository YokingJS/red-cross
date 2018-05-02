
import React from 'react';
import { List, InputItem, ImagePicker } from 'antd-mobile';
import request from '../components/request';

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      donorFiles: [],
      id: '',
      title: '',
      familyDesc: '',
      patientDesc: '',
      imageUrl: '',
      videoUrl: '',
      name: '',
      sex: '',
      age: '',
      disease: '',
      mobile: '',
      targetMoney: '',
      deployDepartment: '',
      currentMoney: '',
      donatorNum: '',
      projectFollowUp: ''
    };
    this.renderButton = this.renderButton.bind(this);
    this.onHelpImgChange = this.onHelpImgChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    let pageUrl = window.location.pathname || '';
    let requestId = (pageUrl.split('/') || []).pop() || '';
    if (!requestId.match(/^[0-9]*$/)) return;
    request.getDrftAppealById('?id=' + requestId).then((res) => {
      if (!res.errorMsg) {
        this.setState({
          ...(res.data || {})
        });
      }
    }, resE => {
    });
  }

  onHelpImgChange(donorFiles, type, index) {
    this.setState({
      donorFiles,
      imageUrl: donorFiles[0].url
    });
  }

  onSubmit(save) {
    const { id = '', title = '', familyDesc = '', patientDesc = '', imageUrl = '', videoUrl = '', name = '',
      sex = '', age = '', disease = '', mobile = '', targetMoney = '', deployDepartment = '',
      currentMoney = '', donatorNum = '' , projectFollowUp = '', status = '0'
    } = this.state || {};
    if (title && familyDesc && patientDesc && name && sex && age && disease && mobile && targetMoney && deployDepartment
    && currentMoney && donatorNum) {
      if (save === 'save') {
        request.saveAppealRecordNotDeploy({
          id, title, familyDesc, patientDesc, imageUrl, videoUrl, name, sex, age, disease, mobile, targetMoney, deployDepartment,
          currentMoney, donatorNum, projectFollowUp, status
        });
      } else {
        request.saveAppealRecordDeploy({
          id, title, familyDesc, patientDesc, imageUrl, videoUrl, name, sex, age, disease, mobile, targetMoney, deployDepartment,
          currentMoney, donatorNum, projectFollowUp
        });
      }
    } else {
      alert('缺少必填项');
    }
  }

  onSave() {
    this.onSubmit('save');
  }

  onChangeInput(item) {
    let onChangeInput = (value) => {
      switch(item) {
        case 'title':
          this.state.title = value;
          break;
        case 'familyDesc':
          this.state.familyDesc = value;
          break;
        case 'patientDesc':
          this.state.patientDesc = value;
          break;
        case 'name':
          this.state.name = value;
          break;
        case 'sex':
          this.state.sex = value;
          break;
        case 'age':
          this.state.age = value;
          break;
        case 'disease':
          this.state.disease = value;
          break;
        case 'videoUrl':
          this.state.videoUrl = value;
          break;
        case 'mobile':
          this.state.mobile = value;
          break;
        case 'targetMoney':
          this.state.targetMoney = value;
          break;
        case 'deployDepartment':
          this.state.deployDepartment = value;
          break;
        case 'currentMoney':
          this.state.currentMoney = value;
          break;
        case 'donatorNum':
          this.state.donatorNum = value;
          break;
        case 'projectFollowUp': 
          this.state.projectFollowUp = value;
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
        <div style={styles.helpButton} onClick={this.onSubmit}>发布</div>
        <div style={{...styles.helpButton, marginLeft: '100px'}} onClick={this.onSave}>保存</div>
      </div>
    );
  }
  
  render() {
    const { donorFiles = [], title = '', familyDesc = '', patientDesc = '', imageUrl = '', videoUrl = '', name = '',
      sex = '', age = '', disease = '', mobile = '', targetMoney = '', deployDepartment = '',
      currentMoney = '', donatorNum = '' , projectFollowUp = ''
    } = this.state || {};
    const MARGINTOP = '10px';
    const TITLEWIDTH = '100px';
    const IMAGEWIDTH = '90px';
    return (
      <div style={styles.fillInfo}>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>标题:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              value={title}
              onChange={this.onChangeInput('title')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>家庭情况:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              value={familyDesc}
              onChange={this.onChangeInput('familyDesc')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>患者境况:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              value={patientDesc}
              onChange={this.onChangeInput('patientDesc')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP, height: IMAGEWIDTH}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>求助图片:</span>
          <div style={{...styles.boxWithBorder, height: IMAGEWIDTH, width: IMAGEWIDTH}} className="pickerBox">
            <ImagePicker
              files={donorFiles}
              onChange={this.onHelpImgChange}
              selectable={donorFiles.length < 1}
            />
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>求助视频:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              value={videoUrl}
              onChange={this.onChangeInput('videoUrl')}
              placeholder="请正确填写url，否则链接无法访问"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>救助人姓名:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              value={name}
              onChange={this.onChangeInput('name')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>救助人性别:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="男/女"
              value={sex}
              onChange={this.onChangeInput('sex')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>联系电话:</span>
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
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>救助人年龄:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              type="number"
              value={age}
              onChange={this.onChangeInput('age')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>病种:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              value={disease}
              onChange={this.onChangeInput('disease')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>目标金额:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              type="targetMoney"
              value={targetMoney}
              onChange={this.onChangeInput('targetMoney')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>已筹金额:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              type="number"
              value={currentMoney}
              onChange={this.onChangeInput('currentMoney')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐款人数:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              type="number"
              value={donatorNum}
              onChange={this.onChangeInput('donatorNum')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '35px'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>项目状态:</span>
          <span style={{...styles.largeText, ...styles.boxNoBorder, ...styles.textOverflow}}>未发布</span>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>发布单位:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder=""
              value={deployDepartment}
              onChange={this.onChangeInput('deployDepartment')}
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>发布时间:</span>
          <span style={{...styles.largeText, ...styles.boxNoBorder, ...styles.textOverflow}}>将获取点击“发布”时的时间</span>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>项目跟进:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请正确填写url，否则跟进链接无法访问"
              value={projectFollowUp}
              onChange={this.onChangeInput('projectFollowUp')}
            ></InputItem>
          </div>
        </div>
        {this.renderButton()}
        <div style={{height: '190px'}}/>
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
  }
};